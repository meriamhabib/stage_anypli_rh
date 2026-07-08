<?php

namespace App\Repositories;

use App\Models\News;

class NewsRepository
{

    /**
     * Récupérer toutes les actualités
     */
    public function getAll()
    {
        return News::with('auteur')->get();
    }



    /**
     * Récupérer une actualité par ID
     */
    public function getById($id)
    {
        return News::with('auteur')->find($id);
    }



    /**
     * Créer une actualité
     */
    public function create(array $data)
    {
        return News::create($data);
    }



    /**
     * Modifier une actualité
     */
    public function update(News $news, array $data)
    {
        $news->update($data);

        return $news;
    }



    /**
     * Supprimer une actualité
     */
    public function delete(News $news)
    {
        return $news->delete();
    }

}