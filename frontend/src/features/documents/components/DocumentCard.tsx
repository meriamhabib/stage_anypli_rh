import type { Document } from "../types/document.types";
import { downloadDocument } from "../services/document.service";

interface Props {
  document: Document;
}

export default function DocumentCard({ document }: Props) {
  const handleDownload = async () => {
    const response = await downloadDocument(document.id);
    const url = window.URL.createObjectURL(new Blob([response.data]));
    const link = window.document.createElement("a");

    link.href = url;
    link.download = document.original_name;
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
  };

  return (
    <article className="documents-card">
      <div className="documents-card-header">
        <div>
          <div className="documents-icon">📄</div>
          <h3 className="documents-card-title">{document.title}</h3>
        </div>
        <span className="documents-chip">{document.document_type}</span>
      </div>

      <p className="documents-card-description">
        {document.description || "Aucune description fournie."}
      </p>

      <div className="documents-meta">
        <span className="documents-meta-item">📅 {new Date(document.created_at).toLocaleDateString("fr-FR")}</span>
        <span className="documents-meta-item">🧾 {document.original_name}</span>
      </div>

      <div className="documents-actions">
        <button className="documents-button" onClick={handleDownload}>
          Télécharger
        </button>
      </div>
    </article>
  );
}