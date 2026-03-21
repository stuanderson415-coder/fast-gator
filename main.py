from scraper import get_unit_info

code = input("Enter unit code: ")
data = get_unit_info(code)

print(data)
