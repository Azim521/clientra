from pydantic import BaseModel
from typing import Optional
from datetime import date, datetime
from uuid import UUID

# Client schemas
class ClientCreate(BaseModel):
    name: str
    email: Optional[str] = None
    platform: Optional[str] = None
    status: Optional[str] = 'lead'
    notes: Optional[str] = None

class ClientUpdate(BaseModel):
    name: Optional[str] = None
    email: Optional[str] = None
    platform: Optional[str] = None
    status: Optional[str] = None
    notes: Optional[str] = None

class ClientResponse(BaseModel):
    id: UUID
    user_id: UUID
    name: str
    email: Optional[str]
    platform: Optional[str]
    status: Optional[str]
    notes: Optional[str]
    created_at: datetime

# Proposal schemas
class ProposalCreate(BaseModel):
    title: Optional[str] = None
    job_description: str
    client_id: Optional[UUID] = None

class ProposalResponse(BaseModel):
    id: UUID
    user_id: UUID
    title: Optional[str]
    job_description: str
    generated_proposal: Optional[str]
    status: Optional[str]
    created_at: datetime

# Earnings schemas
class EarningCreate(BaseModel):
    amount: float
    currency: Optional[str] = 'USD'
    description: Optional[str] = None
    date: Optional[str] = None
    client_id: Optional[UUID] = None

class EarningResponse(BaseModel):
    id: UUID
    user_id: UUID
    amount: float
    currency: str
    description: Optional[str]
    date: Optional[date]
    created_at: datetime