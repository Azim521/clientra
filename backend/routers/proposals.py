from fastapi import APIRouter, HTTPException, Header
from models.schemas import ProposalCreate
from services.supabase import supabase
from typing import Optional
import openai
import os

router = APIRouter(prefix="/proposals", tags=["proposals"])

def get_user_id(authorization: str) -> str:
    try:
        token = authorization.replace("Bearer ", "")
        user = supabase.auth.get_user(token)
        return user.user.id
    except:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

@router.get("/")
def get_proposals(authorization: Optional[str] = Header(None)):
    user_id = get_user_id(authorization)
    response = supabase.table("proposals")\
        .select("*")\
        .eq("user_id", user_id)\
        .order("created_at", desc=True)\
        .execute()
    return response.data

@router.post("/generate")
def generate_proposal(proposal: ProposalCreate, authorization: Optional[str] = Header(None)):
    user_id = get_user_id(authorization)

    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    prompt = f"""You are an expert freelancer writing a winning proposal.
    
Job Description:
{proposal.job_description}

Write a professional, personalized, and compelling freelance proposal that:
- Starts with a strong opening that shows you understand the client's problem
- Highlights relevant skills and experience
- Explains your approach to solving their problem
- Ends with a clear call to action
- Is between 150-250 words
- Sounds human, confident, and not generic

Write only the proposal text, nothing else."""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=500
    )

    generated = response.choices[0].message.content

    # Save to database
    saved = supabase.table("proposals").insert({
        "user_id": user_id,
        "title": proposal.title or "Untitled Proposal",
        "job_description": proposal.job_description,
        "generated_proposal": generated,
        "client_id": str(proposal.client_id) if proposal.client_id else None,
        "status": "draft"
    }).execute()

    return {
        "proposal": generated,
        "id": saved.data[0]["id"]
    }

@router.delete("/{proposal_id}")
def delete_proposal(proposal_id: str, authorization: Optional[str] = Header(None)):
    user_id = get_user_id(authorization)
    supabase.table("proposals")\
        .delete()\
        .eq("id", proposal_id)\
        .eq("user_id", user_id)\
        .execute()
    return {"message": "Proposal deleted successfully"}