from fastapi import APIRouter
from config.config import get_fahem_config


router = APIRouter()


@router.get("/config")
async def config():
    config = get_fahem_config()
    return config.dict()



