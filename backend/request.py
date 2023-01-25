""" These codes below are samples on how to use the api """

# All the imports needed:
import requests
import json

# Open the config file to get the host and port
with open('config.json', 'r') as f:
    config = json.load(f)

# Set the url to the api:
host = "http://" + ":".join([config['host'], str(config['port'])])
# Set the website name to scrape:
website = "example.com"

username = 'InstaBotTest911'
password = 'Rooney07'
# set the params for username and password
params = {'username': username, 'password': password}


# Make the API call with the encoded string
response = requests.get('http://localhost:8000/api/v1/instagram', params=params).json()

# Print the response
# print out the title from the json
print(response)