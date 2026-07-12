import os
import time
import random
from fastapi import FastAPI, Response

app = FastAPI()

SERVER_ID = os.getenv("SERVER_ID", "unknown")
# Simula processamento variável (ms), configurável via env
MIN_WORK_MS = int(os.getenv("MIN_WORK_MS", "5"))
MAX_WORK_MS = int(os.getenv("MAX_WORK_MS", "50"))


@app.get("/health")
def health():
    return {"status": "ok", "server": SERVER_ID}


@app.get("/")
def process():
    work_ms = random.randint(MIN_WORK_MS, MAX_WORK_MS)
    time.sleep(work_ms / 1000)
    return {"server": SERVER_ID, "work_ms": work_ms}
