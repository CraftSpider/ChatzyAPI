import re
from os import path
MAX_GROUPS = 100

PATH = path.dirname(path.realpath(__file__))

def read_file(fname):
    f = open(PATH + "\\" + fname, 'r', encoding='utf8')
    return f.read()
    
def save_file(fname, string):
    f = open(PATH + "\\" + fname, 'w', encoding='utf8')
    f.write(string)
    f.close()

source_code = read_file('ChatzyScript-19.js')
regular_expressions = read_file('regexes.txt').split('\n')
api = read_file('api.js')



def generate_identifiers():
    identifiers = []
    
    for expression in regular_expressions:        
        found = re.search(expression, source_code)
            
        for i in range(1, MAX_GROUPS):
            try:
                identifiers.append(found.group(i))
            except:
                if i == 1:
                    identifiers.append('0000')
                    print('Error locating an identifier. Error is located in regex', expression, 'placeholder 0000 substituted in API.')
                break
                        
    return identifiers
        
def generate_new_api(new_idents, new_api):
    old_idents = re.findall(r'X(\d+)', new_api)
    
    for i in range(1, MAX_GROUPS):
            try:
                old_idents.append(found.group(i))
            except:
                break
                
    print(new_idents)
    print('NEW ---- OLD')
    
    for i in range(0, len(new_idents) - 1):
        new_api = new_api.replace(old_idents[i], new_idents[i])
        print(new_idents[i], "-->" , old_idents[i])
        
    return new_api
            
            
idents = generate_identifiers()
save_file('new_api.js', generate_new_api(idents, api))