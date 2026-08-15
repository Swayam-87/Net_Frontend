import os
from pypdf import PdfReader

pdf_path = "Project Documentation.pdf"
output_path = "scratch/project_documentation_text.txt"

os.makedirs("scratch", exist_ok=True)

try:
    reader = PdfReader(pdf_path)
    text = ""
    for i, page in enumerate(reader.pages):
        text += f"--- PAGE {i+1} ---\n"
        text += page.extract_text() + "\n"
    
    with open(output_path, "w", encoding="utf-8") as f:
        f.write(text)
    print("PDF extracted successfully to", output_path)
except Exception as e:
    print("Error extracting PDF:", e)
