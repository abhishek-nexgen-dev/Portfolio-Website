import os

def create_resume_pdf(filename="public/resume.pdf"):
    # PDF generation helper
    objects = []
    
    def add_object(content):
        objects.append(content)
        return len(objects)

    # We will build stream operations
    stream_ops = []
    
    # Colors: PDF RGB
    # Orange accent: 1.0, 0.42, 0.0 (255, 107, 0)
    # Dark text: 0.1, 0.1, 0.12
    # Gray text: 0.35, 0.35, 0.38
    # Divider line: 0.85, 0.85, 0.88
    
    def set_font(font, size):
        stream_ops.append(f"{font} {size} Tf")
        
    def set_fill_color(r, g, b):
        stream_ops.append(f"{r:.3f} {g:.3f} {b:.3f} rg")
        
    def set_stroke_color(r, g, b):
        stream_ops.append(f"{r:.3f} {g:.3f} {b:.3f} RG")
        
    def draw_text(x, y, text):
        # Escape parenthesis
        safe_text = text.replace('\\', '\\\\').replace('(', '\\(').replace(')', '\\)')
        stream_ops.append(f"BT {x:.2f} {y:.2f} Td ({safe_text}) Tj ET")
        
    def draw_line(x1, y1, x2, y2, width=0.75):
        stream_ops.append(f"{width:.2f} w {x1:.2f} {y1:.2f} m {x2:.2f} {y2:.2f} l S")

    def draw_rect(x, y, w, h, fill=True, stroke=False):
        op = "B" if (fill and stroke) else ("f" if fill else "S")
        stream_ops.append(f"{x:.2f} {y:.2f} {w:.2f} {h:.2f} re {op}")

    # Top banner bar
    set_fill_color(1.0, 0.42, 0.0) # Accent orange top stripe
    draw_rect(0, 786, 612, 6, fill=True, stroke=False)
    
    # Header: Name
    set_fill_color(0.08, 0.08, 0.10)
    set_font("/F2", 22)
    draw_text(40, 750, "ABHISHEK KUMAR GUPTA")
    
    # Title
    set_fill_color(1.0, 0.42, 0.0)
    set_font("/F2", 10.5)
    draw_text(40, 735, "FULL-STACK DEVELOPER & AI SYSTEMS ENGINEER")
    
    # Contact row
    set_fill_color(0.35, 0.35, 0.40)
    set_font("/F1", 8.5)
    draw_text(40, 720, "abhishek.nexgen.dev@gmail.com  |  +91 (India)  |  Jharkhand, India  |  github.com/AbhishekNexGenDev  |  linkedin.com/in/abhisheknexgendev")
    
    # Horizontal rule
    set_stroke_color(0.85, 0.85, 0.88)
    draw_line(40, 710, 572, 710, width=0.75)
    
    curr_y = 696
    
    def section_header(title, y):
        set_fill_color(1.0, 0.42, 0.0)
        set_font("/F2", 10)
        draw_text(40, y, title.upper())
        set_stroke_color(1.0, 0.42, 0.0)
        draw_line(40, y - 4, 572, y - 4, width=0.6)
        return y - 16

    # 1. PROFESSIONAL SUMMARY
    curr_y = section_header("Professional Summary", curr_y)
    set_fill_color(0.20, 0.20, 0.22)
    set_font("/F1", 8.5)
    summary_l1 = "Engineering-focused Full-Stack Developer specializing in resilient web platforms, scalable backend architectures,"
    summary_l2 = "and intelligent multi-agent AI systems. Proven contributor to GDG Ranchi and open-source initiatives, skilled in"
    summary_l3 = "designing RESTful APIs, real-time WebSocket pipelines, and LLM orchestration (LangChain, LangGraph, Gemini)."
    draw_text(40, curr_y, summary_l1)
    draw_text(40, curr_y - 11, summary_l2)
    draw_text(40, curr_y - 22, summary_l3)
    curr_y -= 34

    # 2. TECHNICAL COMPETENCIES
    curr_y = section_header("Technical Competencies", curr_y)
    skills = [
        ("Languages & Runtimes:", "TypeScript, JavaScript (ES6+), Python, Node.js, SQL, HTML5, CSS3"),
        ("Backend & Real-Time:", "Express.js, FastAPI, RESTful APIs, WebSockets (Socket.IO), JWT, Webhooks, Microservices"),
        ("Frontend & UI:", "React.js, Next.js, Tailwind CSS, Redux Toolkit, GSAP, Responsive Design, Vite"),
        ("Databases & Cloud:", "PostgreSQL, MongoDB, Redis (Pub/Sub & Caching), Docker, RabbitMQ, Cloudflare Edge CDN"),
        ("AI & Agentic Systems:", "LangChain, LangGraph (Stateful DAGs), Google Gemini 2.5 API, Qdrant Vector DB, RAG Pipelines"),
        ("Tools & Workflows:", "Git, GitHub, Postman, Linux Environment, npm, Vite, CI/CD Fundamentals")
    ]
    for label, val in skills:
        set_fill_color(0.10, 0.10, 0.12)
        set_font("/F2", 8.5)
        draw_text(40, curr_y, label)
        set_fill_color(0.25, 0.25, 0.28)
        set_font("/F1", 8.5)
        draw_text(150, curr_y, val)
        curr_y -= 12
    curr_y -= 4

    # 3. PROVEN EXPERIENCE & COMMUNITY LEADERSHIP
    curr_y = section_header("Experience & Community Leadership", curr_y)
    
    # GDG Ranchi
    set_fill_color(0.10, 0.10, 0.12)
    set_font("/F2", 9.5)
    draw_text(40, curr_y, "Core Tech Team Member  |  Google Developer Group (GDG) Ranchi")
    set_fill_color(0.40, 0.40, 0.45)
    set_font("/F1", 8.5)
    draw_text(460, curr_y, "2024 - Present")
    curr_y -= 12
    set_fill_color(0.25, 0.25, 0.28)
    gdg_points = [
        "- Engineered software platforms for community tech events, including the official DevFest Ranchi portal handling 5,000+ requests.",
        "- Implemented message queue buffering with RabbitMQ to handle ticket checkout concurrency spikes with zero service drops.",
        "- Led technical developer workshops and hands-on activities focusing on Gemini CLI, API workflows, and modern web frameworks.",
        "- Collaborated across cross-functional organizing teams to coordinate hackathons, speaker platforms, and attendee verification."
    ]
    for p in gdg_points:
        draw_text(48, curr_y, p)
        curr_y -= 11
    curr_y -= 3

    # GSSoC
    set_fill_color(0.10, 0.10, 0.12)
    set_font("/F2", 9.5)
    draw_text(40, curr_y, "Open Source Contributor  |  GirlScript Summer of Code (GSSoC)")
    set_fill_color(0.40, 0.40, 0.45)
    set_font("/F1", 8.5)
    draw_text(495, curr_y, "2024")
    curr_y -= 12
    set_fill_color(0.25, 0.25, 0.28)
    gssoc_points = [
        "- Collaborated on active production open-source repositories; identified edge-case bugs, proposed solutions, and submitted clean PRs.",
        "- Strengthened practical knowledge of Git branching workflows, test coverage verification, and peer code review protocols."
    ]
    for p in gssoc_points:
        draw_text(48, curr_y, p)
        curr_y -= 11
    curr_y -= 4

    # 4. KEY ENGINEERING PROJECTS
    curr_y = section_header("Featured Engineering Projects", curr_y)
    
    projects = [
        (
            "CIITM Student Management System  |  MERN, Socket.IO, Redis, Razorpay Gateway",
            "Role-based academic management platform serving students, faculty, and administrators.",
            [
                "Engineered REST APIs with Express.js and modular MVC structure; enforced strict Role-Based Access Control (RBAC).",
                "Integrated Razorpay Payment Gateway with cryptographically verified HMAC SHA256 webhooks for atomic fee reconciliation.",
                "Built room-partitioned bidirectional real-time notifications via Socket.IO, reducing broadcast overhead by 70%."
            ]
        ),
        (
            "NEXORA Autonomous Multi-Agent AI  |  React, Python, FastAPI, LangGraph, Qdrant",
            "Stateful multi-agent swarm platform orchestrating autonomous decomposition of long-horizon software engineering tasks.",
            [
                "Architected core agent supervisor engine utilizing LangGraph directed acyclic graph (DAG) state machines.",
                "Integrated Qdrant vector database for semantic memory retrieval across long sessions; enforced Pydantic schemas for safe execution.",
                "Constructed real-time WebSocket DAG visualizer in React tracking thought loops, verification steps, and artifacts."
            ]
        ),
        (
            "Tolkify Real-Time Messaging Platform  |  React, TypeScript, Node.js, Socket.IO, Redis",
            "Distributed real-time communication platform engineered for sub-second delivery latency and zero perceptual delay.",
            [
                "Designed typed WebSocket event handlers across server and client with optimistic state updates in Zustand.",
                "Integrated @socket.io/redis-adapter allowing horizontal clustering across multiple Node.js instances with zero message loss."
            ]
        ),
        (
            "AI Movie Recommender  |  React, Vite, Google Gemini 2.5 Flash, TMDB API",
            "Intelligent movie discovery engine utilizing Gemini 2.5 structured JSON output mode to map subjective prompts to cinema catalog.",
            [
                "Crafted few-shot prompt contracts and parallelized TMDB enrichment with Promise.allSettled, cutting latency by 60%."
            ]
        )
    ]
    
    for title, subtitle, bullets in projects:
        set_fill_color(0.10, 0.10, 0.12)
        set_font("/F2", 9)
        draw_text(40, curr_y, title)
        curr_y -= 11
        set_fill_color(0.35, 0.35, 0.40)
        set_font("/F1", 8)
        draw_text(48, curr_y, subtitle)
        curr_y -= 10
        set_fill_color(0.25, 0.25, 0.28)
        for b in bullets:
            draw_text(52, curr_y, "- " + b)
            curr_y -= 10
        curr_y -= 3

    # 5. EDUCATION
    curr_y = section_header("Education", curr_y)
    set_fill_color(0.10, 0.10, 0.12)
    set_font("/F2", 9.5)
    draw_text(40, curr_y, "Bachelor of Computer Applications (BCA)")
    set_fill_color(0.40, 0.40, 0.45)
    set_font("/F1", 8.5)
    draw_text(450, curr_y, "2024 - 2027 (Expected)")
    curr_y -= 12
    set_fill_color(0.25, 0.25, 0.28)
    draw_text(48, curr_y, "Chhotanagpur Institute of Information Technology & Management (CIITM) Dhanbad  |  MCNU Bhopal")
    curr_y -= 11
    draw_text(48, curr_y, "Coursework: Data Structures & Algorithms, Object-Oriented Programming, Database Systems, Web Engineering, Software Architecture.")

    # Assemble PDF stream
    stream_data = "\n".join(stream_ops).encode('latin-1')
    stream_len = len(stream_data)

    # Objects definition
    # 1: Catalog
    # 2: Pages
    # 3: Page
    # 4: Stream Contents
    # 5: Font F1 (Helvetica)
    # 6: Font F2 (Helvetica-Bold)

    pdf_parts = []
    pdf_parts.append(b"%PDF-1.4\n")
    
    offsets = []
    
    def write_obj(num, body_bytes):
        offsets.append(sum(len(p) for p in pdf_parts))
        pdf_parts.append(f"{num} 0 obj\n".encode('latin-1'))
        pdf_parts.append(body_bytes)
        pdf_parts.append(b"\nendobj\n")

    # Obj 1: Catalog
    write_obj(1, b"<</Type /Catalog /Pages 2 0 R>>")
    # Obj 2: Pages
    write_obj(2, b"<</Type /Pages /Kids [3 0 R] /Count 1>>")
    # Obj 3: Page
    write_obj(3, b"<</Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R /Resources << /Font << /F1 5 0 R /F2 6 0 R >> >> >>")
    # Obj 4: Stream
    stream_obj = f"<</Length {stream_len}>>\nstream\n".encode('latin-1') + stream_data + b"\nendstream"
    write_obj(4, stream_obj)
    # Obj 5: Font Helvetica
    write_obj(5, b"<</Type /Font /Subtype /Type1 /BaseFont /Helvetica>>")
    # Obj 6: Font Helvetica-Bold
    write_obj(6, b"<</Type /Font /Subtype /Type1 /BaseFont /Helvetica-Bold>>")

    # Xref
    xref_offset = sum(len(p) for p in pdf_parts)
    pdf_parts.append(b"xref\n0 7\n")
    pdf_parts.append(b"0000000000 65535 f \n")
    for off in offsets:
        pdf_parts.append(f"{off:010d} 00000 n \n".encode('latin-1'))

    pdf_parts.append(b"trailer\n<</Size 7 /Root 1 0 R>>\nstartxref\n")
    pdf_parts.append(f"{xref_offset}\n%%EOF\n".encode('latin-1'))

    full_pdf = b"".join(pdf_parts)
    with open(filename, "wb") as f:
        f.write(full_pdf)
    print(f"Generated {filename} ({len(full_pdf)} bytes)")

if __name__ == "__main__":
    create_resume_pdf()
