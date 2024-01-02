import model
from database import SessionLocal, engine

model.Base.metadata.create_all(bind=engine)
def get_db():
   try:
       db = SessionLocal()
       yield db
   finally:
       db.close()
