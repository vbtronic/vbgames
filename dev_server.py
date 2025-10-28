import http.server
import socketserver
import webbrowser
import threading

PORT = 8000

def open_browser():
    import time
    time.sleep(1)  # Počkat, než se server spustí
    webbrowser.open(f'http://localhost:{PORT}')

# Spustit otevření prohlížeče v novém vlákně
browser_thread = threading.Thread(target=open_browser, daemon=True)
browser_thread.start()

# Spustit server v hlavním vlákně
Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    print("Press Ctrl+C to stop the server")
    try:
        httpd.serve_forever()
    except KeyboardInterrupt:
        print("Server stopped")
