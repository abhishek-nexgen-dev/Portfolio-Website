#!/usr/bin/env python3
"""
Utility script to sync Beyond The Code moment photos from Google Drive.
Usage:
  python3 scripts/download_drive_moments.py [FOLDER_ID_OR_URL]

Ensure Google Drive folder General Access is set to 'Anyone with the link' (Viewer).
"""

import sys
import os
import re
import urllib.request
import json

DEFAULT_FOLDER = "https://drive.google.com/drive/folders/1eA_ok9W8OQ8AWtebDnZXuxMqdAwGdscF?usp=drive_link"
OUT_DIR = os.path.join(os.path.dirname(os.path.dirname(os.path.abspath(__file__))), "public", "images", "moments")

def main():
    target = sys.argv[1] if len(sys.argv) > 1 else DEFAULT_FOLDER
    os.makedirs(OUT_DIR, exist_ok=True)
    print(f"Syncing moments images from: {target}")
    print(f"Target directory: {OUT_DIR}")

    try:
        import gdown
        print("Using gdown to download folder...")
        gdown.download_folder(target, output=OUT_DIR, quiet=False, use_cookies=False)
        print("Download completed successfully!")
    except Exception as e:
        print(f"gdown encountered an issue: {e}")
        print("If access is restricted, make sure to change folder sharing permissions to 'Anyone with the link' (Viewer).")

if __name__ == "__main__":
    main()
