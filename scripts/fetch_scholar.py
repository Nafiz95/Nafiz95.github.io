#!/usr/bin/env python3
"""Fetch citation stats from Google Scholar and emit JSON.

Usage:
    python scripts/fetch_scholar.py > data/scholar.json

Called by .github/workflows/scholar-sync.yml daily.
Scholar user ID: M3FEjQsAAAAJ
"""

import json
import sys
from datetime import date

SCHOLAR_ID = "M3FEjQsAAAAJ"


def fetch():
    try:
        from scholarly import scholarly
    except ImportError:
        print("scholarly not installed — run: pip install scholarly", file=sys.stderr)
        sys.exit(1)

    author = scholarly.search_author_id(SCHOLAR_ID)
    author = scholarly.fill(author, sections=["basics", "indices", "counts"])

    citations   = author.get("citedby", 0)
    h_index     = author.get("hindex", 0)
    i10_index   = author.get("i10index", 0)

    result = {
        "citations":   citations,
        "h_index":     h_index,
        "i10_index":   i10_index,
        "last_updated": str(date.today()),
    }
    print(json.dumps(result, indent=2))


if __name__ == "__main__":
    fetch()
