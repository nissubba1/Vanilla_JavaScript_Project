from bs4 import BeautifulSoup
import requests
import json

url = 'https://en.wikipedia.org/wiki/List_of_colors:_A%E2%80%93F'

page = requests.get(url)

soup = BeautifulSoup(page.text, 'html.parser')

# print(soup.prettify())

colors = soup.find_all('td', attrs={'style': "border-left:solid 2px #AAA;border-right:solid 1px "
                                             "#AAA;font-family:monospace;"})
color_list = []

for color in colors:
    color_list.append(color.string)

new_color_list = []

color_dict = {

}

for color in color_list:
    slice_color = slice(-1)
    new_color_list.append(color[slice_color])

find_tbody = soup.find('tbody')
color_name_parent = find_tbody.find_all('tr')

color_names_list = []

for child in color_name_parent:
    th_element = child.find_all('th')
    for th in th_element:
        color_names_list.append(th.get_text())

remove_header_slice = color_names_list[11:]

formatted_color_names_list = []

for name in remove_header_slice:
    slice_name = slice(-1)
    formatted_color_names_list.append(name[slice_name])

for i in range(len(new_color_list)):
    color_dict[i] = {
        "color_name": formatted_color_names_list[i],
        "hex_value": new_color_list[i]
    }

with open('color_lists_v1.json', 'w') as file:
    json.dump(color_dict, file, indent=4)
