from pydantic import BaseModel
from typing import Optional
from datetime import date
from typing import List

class refuelop_create(BaseModel):
   id: Optional[int] = None    
   fecha: date
   refuelseq: Optional[int] = 1
   importe: float
   preciolitro: Optional[float] = None
   litros: float
   totkm: int


   class Config:
       from_attributes = True


class refuelop_update(BaseModel):
   #id: Optional[int] = None    
   fecha: Optional[date] = None 
   refuelseq: Optional[int] = None  
   importe: Optional[float] = None 
   preciolitro: Optional[float] = None 
   litros: Optional[float] = None 
   totkm: Optional[int] = None 


# class refuelop_response(BaseModel):
#     entries: List[refuelop_schema]|refuelop_schema
#     message: Optional[str] = None
#     total: Optional[int] = None
