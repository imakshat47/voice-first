# Intervu.AI
A voice first, context aware,  agentic interview coach  powered by LangChain and  LLMs

# Initial Set-up
- Install Requirements
```python
python -m vevn venv
venv\Scripts\activate
pip install -r requirements.txt
```

# To Run the server
```python 
uvicorn app:app --host 0.0.0.0 --port 8000 --reload
```

# Features
1. The audit log is JSON-lines (one event per line), no PHI persisted by default (we only store lengths + SHA256 hashes), and it records timestamp, endpoint, request_id, session_id, client_ip, status, and minimal metrics. You can turn on redacted snippet debugging via an env flag if you really need it (off by default).

- What the audit log captures (and why it’s safer)

ts, request_id, session_id, endpoint, phase, client_ip, status

No raw PHI by default — only body_len, body_sha256, and (if enabled) a short redacted preview (PHI_DEBUG=true) to help during development.

Optional per-endpoint response metrics: out_len, out_sha256.

JSON Lines at AUDIT_LOG_PATH so you can stream or ship to SIEM.