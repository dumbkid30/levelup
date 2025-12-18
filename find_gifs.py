import os

root_dir = r"c:\Users\mutee\Desktop\Projects\level up\level-up\public"
for dirpath, dirnames, filenames in os.walk(root_dir):
    for filename in filenames:
        if filename.lower().endswith(".gif"):
            print(os.path.join(dirpath, filename))
