from fastapi import FastAPI, Depends, HTTPException, Response, status
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.orm import Session
from typing import List
from model import RefuelOpORM
from schema import refuelop_create, refuelop_update   #, refuelop_response
from session import get_db
from config import settings

import uvicorn

# print(settings.FRONTEND_URL)

app = FastAPI(title=settings.PROJECT_NAME,version=settings.PROJECT_VERSION)

# origins = [settings.FRONTEND_URL]
origins = settings.FRONTEND_URL

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=['*'],
    allow_headers=['*']
)

@app.get("/")
def read_root():
    return {"message": "Server is up and running!"}

#@app.get("/refuelop", response_model=List[refuelop_schema], status_code=200)
@app.get("/refuelop")
async def get_all_refuelops(response: Response, db: Session = Depends(get_db)):
   try:
     
      refuelop_records = db.query(RefuelOpORM).order_by(RefuelOpORM.fecha.desc(), RefuelOpORM.refuelseq.desc()).all()
   
      return {
               "total": len(refuelop_records),
               "entries": refuelop_records            
         }

   except Exception as e:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "entries": [],
            "total":0, 
            "error": e,
            "detail": e.orig.args if hasattr(e, 'orig') else f"{e}"
        }
   # return refuelOps

#@app.post('/refuelop', response_model = refuelop_schema, status_code=201)
@app.post('/refuelop')
async def create_refuelop(refuelop: refuelop_create, response: Response, db: Session = Depends(get_db)):
   
   try:
   
      new_refuelop = RefuelOpORM(
         fecha = refuelop.fecha,
         refuelseq = refuelop.refuelseq,
         importe = refuelop.importe,
         preciolitro = refuelop.preciolitro,
         litros = refuelop.litros,
         totkm = refuelop.totkm
      )

      #si preciolitro es nulo lo calculamos: importe/litros
      if new_refuelop.preciolitro == None:
         new_refuelop.preciolitro = round(refuelop.importe / refuelop.litros, 3)

      db.add(new_refuelop)
      db.commit()
      db.refresh(new_refuelop)

      return {
         "entries": new_refuelop
      }

   except Exception as e:
        db.rollback()
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "error": e,
            "detail": e.orig.args if hasattr(e, 'orig') else f"{e}"
        }


#@app.get("/refuelop/{id}", response_model = refuelop_schema, status_code=200)
#async def get_refuelop(id:int, response: Response, db: Session = Depends(create_get_session)):
@app.get("/refuelop/{id}")
async def get_refuelop(id: int, response: Response, db: Session = Depends(get_db)):
   

   try:
      refuelop_record = db.query(RefuelOpORM).filter(RefuelOpORM.id == id).first()    #.get(id)
         
      if refuelop_record:
            return {
               "entries": refuelop_record 
               }
      else:
            return {
               "entries": None,
               "message": f"No entries found for id: {id}"
            }

   except Exception as e:
        response.status_code = status.HTTP_400_BAD_REQUEST
        return {
            "entries": [],
            "id_sent": id, 
            "total": 0,
            "error": e,
            "detail": e.orig.args if hasattr(e, 'orig') else f"{e}"
        }

   # return refuelop


@app.patch("/refuelop/{id}")
def update_refuelop(id: int, refuelop: refuelop_update, response: Response, db: Session = Depends(get_db)):
    message = ""
    try:
        
        db_refuelop = db.query(RefuelOpORM).get(id)
        if not db_refuelop:
            raise HTTPException(status_code="404",detail="Record not found")
        
        refuel_data = refuelop.model_dump(exclude_unset=True)
        for key, value in refuel_data.items():
            setattr(db_refuelop, key, value)
        db.commit()                  
        db.refresh(db_refuelop)          
        message="Record correctly updated"
    except Exception as e:
        response.status_code = status.HTTP_400_BAD_REQUEST       
        return {
               "error": e,
               "detail": e.orig.args if hasattr(e, 'orig') else f"{e}"
            }

    return {"entries": db_refuelop, "message": message}


#@app.delete('/refuelop/{id}', status_code=204)
@app.delete('/refuelop/{id}')
async def delete_refuelop(id: int, response: Response, db: Session = Depends(get_db)):
   
   try:
      db_refuelop = db.query(RefuelOpORM).get(id)
      if not db_refuelop:
         raise HTTPException(status_code="404",detail="Record not found")

      db.delete(db_refuelop)
      db.commit()

   # except HTTPException as e:
   #       raise
   except Exception as e:
      response.status_code = status.HTTP_400_BAD_REQUEST
      return {
            "error": e,
            "detail": e.orig.args if hasattr(e, 'orig') else f"{e}"
         }
   response.status_code = status.HTTP_204_NO_CONTENT
   return 


if __name__ == "__main__":
    uvicorn.run("main:app", host=settings.APP_IP, port=settings.APP_PORT, reload=True)