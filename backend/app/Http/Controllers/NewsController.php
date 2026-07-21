<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Http\Concerns\ApiResponse;
use App\Repositories\NewsRepository;

class NewsController extends Controller
{
    use ApiResponse;

    protected $newsRepository;

    public function __construct(NewsRepository $newsRepository)
    {
        $this->newsRepository = $newsRepository;
    }

    /**
     * Afficher toutes les actualités
     */
    public function index()
    {
        return response()->json($this->newsRepository->getAll());
    }

    /**
     * Créer une actualité
     */
    public function store(Request $request)
    {
        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string|max:255',
            'publication_date' => 'required|date',
            'created_by' => 'required|exists:users,id',
        ]);

        $news = $this->newsRepository->create($request->all());

        return $this->createdResponse($news, 'News created successfully');
    }

    /**
     * Afficher une actualité
     */
    public function show($id)
    {
        $news = $this->newsRepository->getById($id);

        if (!$news) {
            return $this->notFoundResponse('News not found');
        }

        return response()->json($news);
    }

    /**
     * Modifier une actualité
     */
    public function update(Request $request, $id)
    {
        $news = $this->newsRepository->getById($id);

        if (!$news) {
            return $this->notFoundResponse('News not found');
        }

        $request->validate([
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'image' => 'nullable|string|max:255',
            'publication_date' => 'required|date',
        ]);

        $news = $this->newsRepository->update($news, $request->all());

        return $this->successResponse($news, 'News modified');
    }

    /**
     * Supprimer une actualité
     */
    public function destroy($id)
    {
        $news = $this->newsRepository->getById($id);

        if (!$news) {
            return $this->notFoundResponse('News not found');
        }

        $this->newsRepository->delete($news);

        return $this->messageResponse('News deleted');
    }
}
