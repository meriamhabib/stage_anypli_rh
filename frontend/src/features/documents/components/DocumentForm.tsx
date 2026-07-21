import { useState } from "react";
import { createDocument } from "../services/document.service";


interface Props {
    onSuccess: () => void;
}


export default function DocumentForm({onSuccess}: Props) {


    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [type,setType] = useState("");
    const [file,setFile] = useState<File | null>(null);


    const handleSubmit = async (e:React.FormEvent)=>{

        e.preventDefault();


        if(!file){
            alert("Veuillez choisir un fichier");
            return;
        }


        const formData = new FormData();


        formData.append("title", title);
        formData.append("description", description);
        formData.append("document_type", type);
        formData.append("file", file);


        try {

            await createDocument(formData);


            alert("Document ajouté avec succès");


            setTitle("");
            setDescription("");
            setType("");
            setFile(null);


            onSuccess();


        } catch(error:any){

    console.log(
        JSON.stringify(
            error.response?.data,
            null,
            2
        )
    );

}

    };



    return (

        <form
            className="documents-form"
            onSubmit={handleSubmit}
        >
            <div className="documents-form-grid">
                <div className="full">
                    <label className="form-label" htmlFor="document-title">
                        Titre du document
                    </label>
                    <input
                        id="document-title"
                        className="documents-input"
                        type="text"
                        placeholder="Titre"
                        value={title}
                        onChange={(e)=>setTitle(e.target.value)}
                    />
                </div>

                <div className="full">
                    <label className="form-label" htmlFor="document-description">
                        Description
                    </label>
                    <textarea
                        id="document-description"
                        className="documents-textarea"
                        placeholder="Description"
                        value={description}
                        onChange={(e)=>setDescription(e.target.value)}
                    />
                </div>

                <div>
                    <label className="form-label" htmlFor="document-type">
                        Catégorie
                    </label>
                    <input
                        id="document-type"
                        className="documents-input"
                        type="text"
                        placeholder="Type (PDF, RH...)"
                        value={type}
                        onChange={(e)=>setType(e.target.value)}
                    />
                </div>

                <div>
                    <label className="form-label" htmlFor="document-file">
                        Fichier
                    </label>
                    <input
                        id="document-file"
                        className="documents-file"
                        type="file"
                        onChange={(e)=>
                            setFile(e.target.files?.[0] || null)
                        }
                    />
                </div>
            </div>

            <div className="documents-actions">
                <button className="documents-button" type="submit">
                    Publier
                </button>
            </div>
        </form>

    );
}