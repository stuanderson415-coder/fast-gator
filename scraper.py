import requests
from bs4 import BeautifulSoup

def get_unit_info(code):
    url = f"https://training.gov.au/Training/Details/{code}"
    response = requests.get(url)
    
    soup = BeautifulSoup(response.text, "html.parser")

    return {
        "code": code,
        "raw_title": soup.title.text if soup.title else "N/A"
    }
