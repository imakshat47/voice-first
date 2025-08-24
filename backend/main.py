# In your main.py or a dedicated auth router
from fastapi import FastAPI, HTTPException, Depends, status
from pydantic import BaseModel
from jose import JWTError, jwt
from passlib.context import CryptContext
from datetime import datetime, timedelta

# --- MOCK DATABASE AND CONFIG ---
# Replace this with your actual user database logic
FAKE_USERS_DB = {
    "john" : {
        "username": "john",
        # Hashed password for "password123"
        "hashed_password": "$2b$12$EixZaYVK1fsbw1ZfbX3fIewAl2qS4i/p2xJ4G3K/T.v.w2NlciV8O", 
    }
}

SECRET_KEY = "YOUR_SUPER_SECRET_KEY_CHANGE_THIS" # Keep this secret!
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 30

pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

# Pydantic models for request body
class UserLogin(BaseModel):
    username: str
    password: str

# --- AUTH FUNCTIONS ---
def create_access_token(data: dict):
    to_encode = data.copy()
    expire = datetime.utcnow() + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    to_encode.update({"exp": expire})
    encoded_jwt = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return encoded_jwt

# --- THE LOGIN ENDPOINT ---
# Assuming 'app' is your FastAPI instance
@app.post("/token") # A standard name for a token-generating endpoint
def login_for_access_token(form_data: UserLogin):
    user = FAKE_USERS_DB.get(form_data.username)
    if not user or not pwd_context.verify(form_data.password, user["hashed_password"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(
        data={"sub": user["username"]} # 'sub' is a standard JWT claim for "subject"
    )
    return {"access_token": access_token, "token_type": "bearer"}