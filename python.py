import requests


# Making a GET request
# r = requests.get('https://usda.gov/topics/opioids')

# check status code for response received
# success code - 200
# print(r)

# print content of request
# print(r.content)

# htmlData = r.content


from openai import OpenAI


# Prompt the user to enter a URL
print("***********************************\n")
print("Welcome to the Read Easy!\n")
print("***********************************\n")
url = input("Enter a URL to simplify: ")

# Making a GET request
r = requests.get(url)

# Check status code for response received
if r.status_code != 200:
    print(f"Failed to retrieve the webpage. Status code: {r.status_code}")
    exit()

# Print content of request
htmlData = r.content.decode('utf-8')  # Assuming the content is in bytes and needs decoding

# Initialize OpenAI client
client = OpenAI(api_key="xx-xxx-xxx")

# Custom string for the prompt
custom_string = "Hello, can you please parse this html and provide a description of what this webpage holds in the main content. Please provide the summerary first:"

# Make request to OpenAI API
response = client.chat.completions.create(
    model="gpt-4o",
    messages=[
        {
            "role": "user",
            "content": f"{custom_string}\n{htmlData}"
        }
    ],
    temperature=1,
    max_tokens=824,
    top_p=1,
    frequency_penalty=0,
    presence_penalty=0
)

# Print the assistant's response
assistant_message = response.choices[0].message.content
print("Assistant response:")
print(assistant_message)
































# client = OpenAI(api_key="xx-xxx-xxx")


# custom_string = "Hello, can you please parse this html and provide a description of what this webpage holds in the main content:"

# response = client.chat.completions.create(
#   model="gpt-4o",
#   messages=[
#     {
#       "role": "user",
#       "content": [
#         {
#           "type": "text",
#           "text":  f"{custom_string}\n{htmlData}"
#         }
#       ]
#     },
#   ],
#   temperature=1,
#   max_tokens=512,
#   top_p=1,
#   frequency_penalty=0,
#   presence_penalty=0
# )



# assistant_message = response.choices[0].message.content
# print("Assistant response:")
# print(assistant_message)










