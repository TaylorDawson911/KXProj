from bs4 import BeautifulSoup
import requests
from instagrapi import Client


def main():
    url = "https://www.instagram.com/meeracoat/followers/?hl=en"
    response = requests.get(url)
    html = response.content
    soup = BeautifulSoup(html, 'html.parser')
    print(soup.prettify())

def login():
    client = Client()
    username = "InstaBotTest911"
    password = "Rooney07"
    client.login(username, password)
    print(f"Logged in as {username}")



login()