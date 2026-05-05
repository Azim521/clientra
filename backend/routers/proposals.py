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

@router.post("/outreach")
def generate_outreach(
    data: dict,
    authorization: Optional[str] = Header(None)
):
    user_id = get_user_id(authorization)

    target = data.get("target_description", "")
    service = data.get("service", "")

    if not target or not service:
        raise HTTPException(status_code=400, detail="Missing fields")

    client = openai.OpenAI(api_key=os.getenv("OPENAI_API_KEY"))

    prompt = f"""You are an expert freelancer writing cold outreach messages.

Target client description:
{target}

My service/skill:
{service}

Write 3 outreach messages:

1. LINKEDIN MESSAGE (max 300 characters - strict limit):
A punchy, personalized LinkedIn connection message.

2. COLD EMAIL (subject line + body, 150-200 words):
Professional cold email that gets replies.

3. FOLLOW-UP MESSAGE (max 150 words):
A follow-up if they didn't reply after 3 days.

Format your response exactly like this:
---LINKEDIN---
[linkedin message here]
---EMAIL_SUBJECT---
[subject line here]
---EMAIL_BODY---
[email body here]
---FOLLOWUP---
[followup message here]"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}],
        max_tokens=800
    )

    content = response.choices[0].message.content

    # Parse the response
    def extract(tag_start, tag_end):
        try:
            start = content.index(tag_start) + len(tag_start)
            end = content.index(tag_end)
            return content[start:end].strip()
        except:
            return ""

    linkedin = extract("---LINKEDIN---", "---EMAIL_SUBJECT---")
    subject = extract("---EMAIL_SUBJECT---", "---EMAIL_BODY---")
    email_body = extract("---EMAIL_BODY---", "---FOLLOWUP---")
    followup = content.split("---FOLLOWUP---")[-1].strip()

    return {
        "linkedin": linkedin,
        "email_subject": subject,
        "email_body": email_body,
        "followup": followup
    }