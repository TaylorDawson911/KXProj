from instagrapi import Client
from fastapi import FastAPI
from fastapi import Query
import requests
from bs4 import BeautifulSoup
import uvicorn

app = FastAPI()

client = Client()

username = "Testingaccount12435232"
password = "Rooney07"

client.login(username, password)

@app.get("/api/v1/instagram")
# create function with 2 parameters, username and password
def instagram(username: str = Query(None), amounts: int = Query(None)):
    # return with username and password
    print(username)
    print(amounts)
    user = client.user_id_from_username(username)
    followers = client.user_followers_gql(user_id=user, amount=amounts)
    followerdict = {}
    follower_user = []
    # get followers from user, and put them in their own list in a dictionary
    for follower in followers:
        user_info = client.user_info_by_username(follower.username)
        follower_user.append(follower.username)
        followerdict[follower.username] = user_info
    return followerdict

@app.get("/api/v1/instagram/dummydata")
# create function with no parameters
def dummydata():
    print("dummydata")

    return
    
# start the server
if __name__ == "__main__":
    uvicorn.run(app, host="127.0.0.1", port=8000)
    print("[100%] | FastAPI Server initialized!")


