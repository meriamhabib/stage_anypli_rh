<?php

namespace App\Http\Concerns;

use Illuminate\Http\JsonResponse;

trait ApiResponse
{
    /**
     * Return a JSON response containing a payload, optionally wrapped with a
     * message and stored under a custom key.
     */
    protected function successResponse(
        mixed $data = null,
        ?string $message = null,
        int $status = 200,
        string $dataKey = 'data'
    ): JsonResponse {
        $payload = [];

        if ($message !== null) {
            $payload['message'] = $message;
        }

        if ($data !== null) {
            $payload[$dataKey] = $data;
        }

        return response()->json($payload, $status);
    }

    /**
     * Return a JSON response for a freshly created resource (HTTP 201).
     */
    protected function createdResponse(
        mixed $data,
        string $message,
        string $dataKey = 'data'
    ): JsonResponse {
        return $this->successResponse($data, $message, 201, $dataKey);
    }

    /**
     * Return a JSON response carrying only a message.
     */
    protected function messageResponse(string $message, int $status = 200): JsonResponse
    {
        return response()->json(['message' => $message], $status);
    }

    /**
     * Return a "not found" JSON response (HTTP 404).
     */
    protected function notFoundResponse(string $message = 'Resource not found'): JsonResponse
    {
        return $this->messageResponse($message, 404);
    }
}
