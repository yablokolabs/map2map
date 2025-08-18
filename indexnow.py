#!/usr/bin/env python3
"""
IndexNow URL Submission Script

This script helps submit URLs to search engines using the IndexNow protocol.
"""
import sys
import json
import requests
from typing import List, Dict, Optional

# Configuration
INDEXNOW_KEY = "8019632125c04e5f9a1d2c3b5d02e6b3"
SITE_URL = "https://map2map.com"  # Update this with your actual domain
INDEXNOW_ENDPOINT = "https://api.indexnow.org/indexnow"

def submit_single_url(url: str, key: str = INDEXNOW_KEY, endpoint: str = INDEXNOW_ENDPOINT) -> Dict:
    """Submit a single URL to IndexNow using the official API."""
    if not url.startswith('http'):
        url = f"{SITE_URL.rstrip('/')}/{url.lstrip('/')}"
    
    headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Host': 'api.indexnow.org'
    }
    
    data = {
        'host': SITE_URL.replace('https://', '').rstrip('/'),
        'key': key,
        'keyLocation': f"{SITE_URL.rstrip('/')}/{key}.txt",
        'urlList': [url]
    }
    
    try:
        response = requests.post(
            endpoint,
            headers=headers,
            json=data,
            timeout=10
        )
        return {
            'status': 'success' if response.status_code == 200 else 'error',
            'status_code': response.status_code,
            'message': response.text or 'No content',
            'url': url
        }
    except Exception as e:
        return {
            'status': 'error',
            'message': str(e),
            'url': url
        }

def submit_multiple_urls(urls: List[str], key: str = INDEXNOW_KEY, endpoint: str = INDEXNOW_ENDPOINT) -> Dict:
    """Submit multiple URLs to IndexNow (up to 10,000 at once)."""
    # Ensure all URLs are absolute
    full_urls = []
    for url in urls:
        if not url.startswith('http'):
            url = f"{SITE_URL.rstrip('/')}/{url.lstrip('/')}"
        full_urls.append(url)
    
    headers = {
        'Content-Type': 'application/json; charset=utf-8',
        'Host': 'api.indexnow.org'
    }
    
    data = {
        'host': SITE_URL.replace('https://', '').rstrip('/'),
        'key': key,
        'keyLocation': f"{SITE_URL.rstrip('/')}/{key}.txt",
        'urlList': full_urls
    }
    
    try:
        response = requests.post(
            endpoint,
            headers=headers,
            json=data,
            timeout=10
        )
        return {
            'status': 'success' if response.status_code == 200 else 'error',
            'status_code': response.status_code,
            'message': response.text or 'No content',
            'urls_submitted': len(urls)
        }
    except Exception as e:
        return {
            'status': 'error',
            'message': str(e),
            'urls_submitted': 0
        }

def main():
    """Handle command line execution."""
    import argparse
    
    parser = argparse.ArgumentParser(description='Submit URLs to search engines using IndexNow')
    subparsers = parser.add_subparsers(dest='command', help='Command to run')
    
    # Single URL submission
    single_parser = subparsers.add_parser('single', help='Submit a single URL')
    single_parser.add_argument('url', help='URL to submit (can be relative)')
    
    # Multiple URLs submission
    multi_parser = subparsers.add_parser('bulk', help='Submit multiple URLs from a file')
    multi_parser.add_argument('file', help='Text file containing one URL per line')
    
    args = parser.parse_args()
    
    if args.command == 'single':
        result = submit_single_url(args.url)
        print(json.dumps(result, indent=2))
    
    elif args.command == 'bulk':
        try:
            with open(args.file, 'r') as f:
                urls = [line.strip() for line in f if line.strip()]
            
            if not urls:
                print("Error: No URLs found in the file")
                sys.exit(1)
                
            print(f"Submitting {len(urls)} URLs...")
            result = submit_multiple_urls(urls)
            print(json.dumps(result, indent=2))
            
        except FileNotFoundError:
            print(f"Error: File '{args.file}' not found")
            sys.exit(1)
    
    else:
        parser.print_help()

if __name__ == "__main__":
    main()
