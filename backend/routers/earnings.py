from fastapi import APIRouter, HTTPException, Header
from models.schemas import EarningCreate
from services.supabase import supabase
from typing import Optional

router = APIRouter(prefix="/earnings", tags=["earnings"])

def get_user_id(authorization: str) -> str:
    try:
        token = authorization.replace("Bearer ", "")
        user = supabase.auth.get_user(token)
        return user.user.id
    except:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

@router.get("/")
def get_earnings(authorization: Optional[str] = Header(None)):
    user_id = get_user_id(authorization)
    response = supabase.table("earnings")\
        .select("*")\
        .eq("user_id", user_id)\
        .order("date", desc=True)\
        .execute()
    return response.data

@router.post("/")
def add_earning(earning: EarningCreate, authorization: Optional[str] = Header(None)):
    user_id = get_user_id(authorization)
    data = earning.model_dump()
    data["user_id"] = user_id
    if data.get("date"):
        data["date"] = str(data["date"])
    if data.get("client_id"):
        data["client_id"] = str(data["client_id"])
    response = supabase.table("earnings").insert(data).execute()
    return response.data[0]

@router.get("/summary")
def get_summary(authorization: Optional[str] = Header(None)):
    user_id = get_user_id(authorization)

    earnings = supabase.table("earnings")\
        .select("amount, date")\
        .eq("user_id", user_id)\
        .execute()

    total = sum(e["amount"] for e in earnings.data)

    from datetime import date
    current_month = date.today().month
    current_year = date.today().year
    monthly = sum(
        e["amount"] for e in earnings.data
        if e["date"] and
        int(e["date"].split("-")[1]) == current_month and
        int(e["date"].split("-")[0]) == current_year
    )

    clients = supabase.table("clients")\
        .select("id, status")\
        .eq("user_id", user_id)\
        .execute()

    active_clients = sum(1 for c in clients.data if c["status"] == "active")

    proposals = supabase.table("proposals")\
        .select("id")\
        .eq("user_id", user_id)\
        .execute()

    return {
        "total_earnings": total,
        "monthly_earnings": monthly,
        "active_clients": active_clients,
        "total_proposals": len(proposals.data)
    }

@router.delete("/{earning_id}")
def delete_earning(earning_id: str, authorization: Optional[str] = Header(None)):
    user_id = get_user_id(authorization)
    supabase.table("earnings")\
        .delete()\
        .eq("id", earning_id)\
        .eq("user_id", user_id)\
        .execute()
    return {"message": "Earning deleted successfully"}