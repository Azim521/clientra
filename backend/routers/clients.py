from fastapi import APIRouter, HTTPException, Header
from models.schemas import ClientCreate, ClientUpdate
from services.supabase import supabase
from typing import Optional

router = APIRouter(prefix="/clients", tags=["clients"])

def get_user_id(authorization: str) -> str:
    try:
        token = authorization.replace("Bearer ", "")
        user = supabase.auth.get_user(token)
        return user.user.id
    except:
        raise HTTPException(status_code=401, detail="Invalid or expired token")

@router.get("/")
def get_clients(authorization: Optional[str] = Header(None)):
    user_id = get_user_id(authorization)
    response = supabase.table("clients")\
        .select("*")\
        .eq("user_id", user_id)\
        .order("created_at", desc=True)\
        .execute()
    return response.data

@router.post("/")
def create_client(client: ClientCreate, authorization: Optional[str] = Header(None)):
    user_id = get_user_id(authorization)
    data = client.model_dump()
    data["user_id"] = user_id
    response = supabase.table("clients").insert(data).execute()
    return response.data[0]

@router.patch("/{client_id}")
def update_client(client_id: str, client: ClientUpdate, authorization: Optional[str] = Header(None)):
    user_id = get_user_id(authorization)
    data = {k: v for k, v in client.model_dump().items() if v is not None}
    response = supabase.table("clients")\
        .update(data)\
        .eq("id", client_id)\
        .eq("user_id", user_id)\
        .execute()
    return response.data[0]

@router.delete("/{client_id}")
def delete_client(client_id: str, authorization: Optional[str] = Header(None)):
    user_id = get_user_id(authorization)
    supabase.table("clients")\
        .delete()\
        .eq("id", client_id)\
        .eq("user_id", user_id)\
        .execute()
    return {"message": "Client deleted successfully"}