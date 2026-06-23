import os
import sys
import http.server
import socketserver
from urllib.parse import urlparse

ROOT = "/Users/luiscarlosromero/Documents/Uxuaria/website"
os.chdir(ROOT)
port = int(sys.argv[1]) if len(sys.argv) > 1 else 3456

class CleanURLHandler(http.server.SimpleHTTPRequestHandler):
    def do_GET(self):
        parsed = urlparse(self.path)
        url_path = parsed.path  # e.g. /ai-mvp-rescue

        # If no file extension, check if .html version exists
        if not os.path.splitext(url_path)[1]:
            candidate = os.path.join(ROOT, url_path.lstrip('/')) + '.html'
            if os.path.isfile(candidate):
                self.path = url_path + '.html'
                if parsed.query:
                    self.path += '?' + parsed.query

        super().do_GET()

    def log_message(self, format, *args):
        pass

with socketserver.TCPServer(("", port), CleanURLHandler) as httpd:
    httpd.allow_reuse_address = True
    print(f"Serving at http://localhost:{port}", flush=True)
    httpd.serve_forever()
