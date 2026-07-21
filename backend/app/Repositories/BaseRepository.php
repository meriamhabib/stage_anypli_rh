<?php

namespace App\Repositories;

use Illuminate\Database\Eloquent\Model;

abstract class BaseRepository
{
    /**
     * The Eloquent model handled by the repository.
     */
    protected Model $model;

    /**
     * Relations eager-loaded on read operations.
     *
     * @var array<int, string>
     */
    protected array $relations = [];

    /**
     * Retrieve all records with their configured relations.
     */
    public function getAll()
    {
        return $this->model->with($this->relations)->get();
    }

    /**
     * Retrieve a single record by its primary key.
     */
    public function getById($id)
    {
        return $this->model->with($this->relations)->find($id);
    }

    /**
     * Create a new record.
     */
    public function create(array $data)
    {
        return $this->model->create($data);
    }

    /**
     * Update an existing model instance.
     */
    public function update(Model $model, array $data)
    {
        $model->update($data);

        return $model;
    }

    /**
     * Delete a model instance.
     */
    public function delete(Model $model)
    {
        return $model->delete();
    }
}
