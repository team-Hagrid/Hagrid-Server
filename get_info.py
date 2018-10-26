from ktis_parser.ktis_parser import *
import sys
import json

print(json.dumps(parseInfoFromKTIS(str(sys.argv[1]), str(sys.argv[2]))))
