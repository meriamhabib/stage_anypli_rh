import { useEffect, useState } from "react";
import AppLayout from "../../../components/layout/AppLayout";
import { getDocuments } from "../services/document.service";
import type { Document } from "../types/document.types";
import DocumentCard from "../components/DocumentCard";
import DocumentForm from "../components/DocumentForm";
import "../Documents.css";

export default function DocumentsPage() {
  const [documents, setDocuments] = useState<Document[]>([]);
  const user = JSON.parse(localStorage.getItem("user") || "{}");

  const loadDocuments = async () => {

        try {

            const response = await getDocuments();

            setDocuments(response.data);

        } catch(error){

            console.log(error);

        }

    };


    useEffect(()=>{

        loadDocuments();

    },[]);



    return (
        <AppLayout>
            <div className="documents-page">
                <section className="documents-hero">
                    <div className="documents-hero-content">
                        <span className="documents-badge">📁 Centre de documents</span>
                        <h1 className="documents-title">Documents et fichiers partagés</h1>
                        <p className="documents-subtitle">
                            Retrouvez les documents institutionnels, les procédures et les ressources utiles à l’équipe.
                        </p>
                    </div>
                </section>

                <div className="documents-content">
                    {
                        user.role === "director" &&

                        <div className="documents-form-card">
                            <h2>Ajouter un document</h2>
                            <p>Publiez un nouveau fichier pour le rendre accessible aux membres.</p>
                            <DocumentForm
                                onSuccess={loadDocuments}
                            />
                        </div>
                    }

                    <div className="documents-list-card">
                        <h2>Documents disponibles</h2>
                        <p>Consultez, téléchargez et gérez les fichiers partagés.</p>

                        {
                            documents.length === 0 ? (
                                <div className="documents-empty">
                                    <strong>Aucun document disponible pour le moment.</strong>
                                    <span>Les fichiers publiés apparaîtront ici.</span>
                                </div>
                            ) : (
                                <div className="documents-grid">
                                    {documents.map(doc=>(
                                        <DocumentCard
                                            key={doc.id}
                                            document={doc}
                                        />
                                    ))}
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}