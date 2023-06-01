import json

zones = json.load(open('zones_original.json', 'r'))['zones']

def get_name_for_zone(zone):
    loc = zone['location']

    # if loc['comment'] != '':
    #     return loc['comment'] + ', ' + loc['countryName']

    zonename = zone['id'].split('/')[-1].replace('_', ' ')

    return zonename + ', ' + loc['countryName']

print(zones)
zones_filtered = []
for zone in zones:
    if zone['location'] is None:
        print('skipping', zone['id'])
        continue
    name = get_name_for_zone(zone)
    print(f'{zone["id"]} => {name}')

    zones_filtered.append({
        'name': name,
        'iana': zone['id']
    })

json.dump(
    { 'zones': zones_filtered },
    open('zones.json', 'w')
)
