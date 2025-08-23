Hackademia: Voice-Enabled Retrieval-Augmented Generation (RAG) System for Healthcare
====================================================================================

TEAM: ALPHA (Akshat Kumar, Beeravalli Anjali, Rishikeshwaran M, National College Jayanagar)

------------------------------------------------------------------------------------
SECTION 1: PROBLEM STATEMENT
------------------------------------------------------------------------------------

Contextual Background
---------------------
Healthcare has experienced a significant digital transformation with the adoption of Electronic Health Records (EHRs), online clinical guidelines, and PubMed-scale research databases. Despite these advancements, retrieving actionable insights remains cumbersome. Traditional keyword-based search often yields overwhelming and irrelevant results, leading to cognitive overload.

Problem Framing
---------------
In clinical practice, efficiency and accuracy are paramount. Clinicians and researchers are frequently required to retrieve information under time-sensitive conditions—during rounds, emergencies, or consultations. Traditional search methods demand manual typing, repetitive clicks, and form-based navigation, which break workflow and distract professionals from patient-centered care.

Information Overload
--------------------
Medical literature and EHRs are expanding exponentially. Studies indicate that clinicians spend significant time locating relevant information, and failures in information retrieval can delay care or contribute to errors. Current AI-driven search systems provide some relief but often hallucinate or present unverifiable claims, which is dangerous in medical settings.

Gap Analysis
------------
Existing commercial solutions (e.g., Epic, Cerner, Augnito) support limited natural language querying but lack contextual awareness, semantic fidelity, and transparency. Furthermore, they are not optimized for hands-free environments such as operating theaters or emergency care.

Problem Statement
-----------------
Despite advances in AI and information retrieval, there is no robust, voice-first, context-aware system that reliably queries healthcare knowledge bases while ensuring safety, transparency, and trustworthiness. Hackademia aims to fill this gap.

------------------------------------------------------------------------------------
SECTION 2: IMPLEMENTATION TECH STACK
------------------------------------------------------------------------------------

Frontend
--------
- **Technology**: React.js
- **Features**: 
  * Voice interface for input and playback.
  * User feedback integration for correcting AI responses.
- **Rationale**: React provides a modular, scalable, and cross-platform interface framework suitable for web and mobile healthcare applications.

Backend
-------
- **Technology**: FastAPI
- **Features**: 
  * Lightweight RESTful endpoints for ASR, retrieval, generation, and TTS modules.
  * Asynchronous support ensures low latency, crucial in clinical environments.
- **Rationale**: FastAPI is modern, type-safe, and integrates seamlessly with Python-based ML pipelines.

Retrieval & LLM Layer
---------------------
- **Retriever**: LlamaIndex or OpenAI Agent SDK.
- **Vector Databases**: FAISS, Pinecone, or Weaviate.
- **Embeddings**: PubMedBERT, BioBERT for domain-specific semantic similarity.
- **LLM**: GPT-4 or equivalent models fine-tuned on clinical corpora.
- **Rationale**: This hybrid architecture supports retrieval-augmented generation (RAG), ensuring grounding in factual, evidence-based data.

ASR and TTS
-----------
- **ASR**: Whisper (open-source, multilingual, robust in noisy environments).
- **TTS**: Coqui.ai, Google Cloud, or Amazon Polly.
- **Rationale**: High-accuracy ASR and natural-sounding TTS improve user trust and adoption.

Deployment & Scalability
------------------------
- **Containerization**: Docker.
- **Orchestration**: Kubernetes.
- **CI/CD**: GitHub Actions or GitLab CI.
- **Governance**: Secure audit logging, HIPAA/GDPR compliance.
- **Rationale**: Ensures rapid scaling, fault tolerance, and secure updates.

------------------------------------------------------------------------------------
SECTION 3: SOLUTION
------------------------------------------------------------------------------------

System Architecture
-------------------
Pipeline:
1. Voice Input
2. Automatic Speech Recognition (ASR)
3. Intent Parsing
4. Retriever (embedding query + searching vector DB)
5. LLM Response Generation with Guardrails
6. Transparency: Citations + Uncertainty Markers
7. Text-to-Speech (TTS)
8. Delivery to User

Guardrails
----------
- Enforced use of retrieved documents.
- Blocking unverifiable claims.
- Source citations and uncertainty disclaimers.
- Safe completions monitored by audit logs.

Human-in-the-Loop
-----------------
- Clinicians provide feedback on responses.
- Feedback loop refines retriever ranking and improves guardrails.

Evaluation Framework
--------------------
- Retrieval Precision/Recall.
- Response Latency (target: <2s).
- Guardrail Exceptions Logged.
- Usability Scores from clinician surveys.

Benefits & Value
----------------
- **Efficiency**: Streamlines access through voice-first interaction.
- **Credibility**: Ensures evidence-backed responses.
- **Compliance**: Built-in safety guardrails.
- **Maintainability**: New data ingestion without retraining LLM.

Feasibility & Real-World Adoption
---------------------------------
- Case studies: Boston Children’s, Apollo Hospitals, Infinitus voice agent.
- Applications: Patient triage, discharge guidance, chronic care management.

Future Directions
-----------------
- Multilingual expansion.
- Integration with IoT/wearable devices.
- Multimodal support (voice + imaging).
- AI personalization for patients.

====================================================================================

====================================================================================


1. User-Onboarding & Profile:
   - Secure registration and login
   - Role-based onboarding flows (farmer, entrepreneur, student)
   - Dashboard displaying user profile and chatbot session tracking

2. Government Scheme Discovery:
   - NLP-enabled query interface for scheme recommendations
   - Personalized scheme matching using age, location, income, occupation
   - Summarized eligibility, benefits, application process
   - Live web lookups using gov_scheme_search tool
   - Multi-turn conversational guidance on schemes

3. Destination & Local Insights:
   - Real-time data on weather, internet speed, safety, water quality, ATMs
   - Recommended stay durations
   - Local service suggestions: hospitals, transport, coffee shops
   - Drag-and-drop itinerary planner (for travel-like experiences)

4. Expense & Budget Tracking:
   - Track expenses and split costs among users
   - Dashboard chart of spending vs budget
   - Budget estimation for scheme benefits or project plans

5. Checklist & Document Management:
   - Generate customized checklists for documents or tasks
   - Pre-built templates for scheme applications
   - Shareable digital checklist across users

6. Content, Alerts & Guidance:
   - Detailed guidance on application steps and criteria
   - Notifications about new schemes or deadlines
   - Contextual alerts based on user profile

7. Tool Integration & Search:
   - Calls gov_scheme_search for live data retrieval
   - Summarizes key info and lists relevant support links
   - Packages output in structured format for frontend processing

8. Feedback & Support:
   - Feedback mechanism for user satisfaction
   - Escalation from chatbot to human support
   - Help center with FAQs and educational content

9. Platform & Access:
   - Responsive UI for mobile/desktop
   - Low-bandwidth mode tailored for rural users
   - Clear navigation across chat, scheme info, checklists, and alerts
<hr>
## 🌐 Supported Languages
- English
- Hindi
- Marathi
- Gujarati
- Bengali
<hr>
## 🛠️ Tech Stack

- React (v19+)
- React Router
- i18next (localization)
- React Speech Kit (voice input)
- Tailwind CSS (styling)
<hr>
## 📁 Folder Structure
frontend/
├── public/
│ └── index.html
├── src/
│ ├── assets/
│ ├── components/
│ ├── contexts/
│ ├── i18n/
│ ├── pages/
│ ├── App.jsx
│ ├── main.jsx
├── .env
├── package.json
└── README.md
<hr>
## ⚙️ Setup Instructions

### 1. Clone the Repository
git clone 

### 2.Install Dependencies
npm install --legacy-peer-deps
<br/>
--If you get errors (e.g., with react-speech-kit)
npm install react@18 react-dom@18
