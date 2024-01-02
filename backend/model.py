from sqlalchemy.schema import Column
from sqlalchemy.types import String, Integer, Text, Date, Float
from database import Base
from sqlalchemy.ext.declarative import declarative_base

DB_BASE_ORM = declarative_base()

class RefuelOpORM(DB_BASE_ORM):
   __tablename__ = "refuelop"
   id = Column(Integer, primary_key=True, index=True, autoincrement=True)   
   fecha = Column(Date)
   refuelseq = Column(Integer, default=1) 
   importe = Column(Float)
   preciolitro = Column(Float, nullable=True)
   litros = Column(Float)
   totkm = Column(Integer)
