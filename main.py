from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

# Allow frontend to call API from browser
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust if deploying publicly
    allow_methods=["*"],
    allow_headers=["*"],
)

class DataInput(BaseModel):
    data: str

@app.post("/sort")
async def sort_string(payload: DataInput):
    if not payload.data or not isinstance(payload.data, str):
        raise HTTPException(status_code=400, detail='Field "data" must be a string.')
    sorted_chars = sorted(payload.data)
    return {"word": sorted_chars}