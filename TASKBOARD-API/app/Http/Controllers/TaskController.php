<?php

namespace App\Http\Controllers;

use App\Http\Resources\TaskResource;
use App\Models\Project;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    public function index(Request $request, Project $project)
    {
        abort_unless(
            $project->user()->is($request->user()),
            403
        );

        $tasks = $project->tasks()
            ->with('project')
            ->latest()
            ->get();

        return TaskResource::collection($tasks);
    }

    public function store(Request $request, Project $project)
    {
        abort_unless(
            $project->user()->is($request->user()),
            403
        );

        $data = $request->validate([
            'title' => 'required|string|max:255',
            'due_date' => 'nullable|date',
        ]);

        $task = $project->tasks()->create($data);

        $task->load('project');

        return (new TaskResource($task))
            ->response()
            ->setStatusCode(201);
    }

    public function show(Request $request, Task $task)
    {
        abort_unless(
            $task->project->user()->is($request->user()),
            403
        );

        $task->load('project');

        return new TaskResource($task);
    }

    public function update(Request $request, Task $task)
    {
        abort_unless(
            $task->project->user()->is($request->user()),
            403
        );

        $data = $request->validate([
            'title' => 'sometimes|required|string|max:255',
            'due_date' => 'nullable|date',
            'is_done' => 'sometimes|boolean',
        ]);

        $task->update($data);

        $task->load('project');

        return new TaskResource($task);
    }

    public function destroy(Request $request, Task $task)
    {
        abort_unless(
            $task->project->user()->is($request->user()),
            403
        );

        $task->delete();

        return response()->noContent();
    }
}