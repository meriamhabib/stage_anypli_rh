<?php

namespace Tests\Unit\Repositories;

use App\Models\User;
use App\Repositories\UserRepository;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Tests\TestCase;

class UserRepositoryTest extends TestCase
{
    use RefreshDatabase;

    private UserRepository $repository;

    protected function setUp(): void
    {
        parent::setUp();
        $this->repository = new UserRepository;
    }

    public function test_create_persists_a_user(): void
    {
        $user = $this->repository->create([
            'last_name' => 'Doe',
            'first_name' => 'John',
            'email' => 'john@example.com',
            'password' => 'secret-password',
        ]);

        $this->assertInstanceOf(User::class, $user);
        $this->assertDatabaseHas('users', ['email' => 'john@example.com']);
    }

    public function test_find_by_email_returns_matching_user(): void
    {
        $user = User::factory()->create(['email' => 'jane@example.com']);

        $found = $this->repository->findByEmail('jane@example.com');

        $this->assertNotNull($found);
        $this->assertTrue($user->is($found));
    }

    public function test_find_by_email_returns_null_when_missing(): void
    {
        $this->assertNull($this->repository->findByEmail('nobody@example.com'));
    }

    public function test_find_by_id_returns_matching_user(): void
    {
        $user = User::factory()->create();

        $this->assertTrue($user->is($this->repository->findById($user->id)));
    }

    public function test_find_by_id_returns_null_when_missing(): void
    {
        $this->assertNull($this->repository->findById(999));
    }

    public function test_get_all_returns_every_user(): void
    {
        User::factory()->count(3)->create();

        $this->assertCount(3, $this->repository->getAll());
    }

    public function test_update_modifies_and_returns_the_user(): void
    {
        $user = User::factory()->create(['first_name' => 'Old']);

        $updated = $this->repository->update($user, ['first_name' => 'New']);

        $this->assertSame('New', $updated->first_name);
        $this->assertDatabaseHas('users', ['id' => $user->id, 'first_name' => 'New']);
    }

    public function test_delete_removes_the_user(): void
    {
        $user = User::factory()->create();

        $this->repository->delete($user);

        $this->assertDatabaseMissing('users', ['id' => $user->id]);
    }

    public function test_get_employees_only_returns_employees(): void
    {
        User::factory()->count(2)->create(['role' => 'employee']);
        User::factory()->create(['role' => 'director']);

        $employees = $this->repository->getEmployees();

        $this->assertCount(2, $employees);
        $this->assertTrue($employees->every(fn ($u) => $u->role === 'employee'));
    }

    public function test_find_employee_returns_employee_by_id(): void
    {
        $employee = User::factory()->create(['role' => 'employee']);

        $this->assertTrue($employee->is($this->repository->findEmployee($employee->id)));
    }

    public function test_find_employee_throws_for_a_director(): void
    {
        $director = User::factory()->create(['role' => 'director']);

        $this->expectException(ModelNotFoundException::class);

        $this->repository->findEmployee($director->id);
    }

    public function test_create_employee_hashes_password_and_sets_role(): void
    {
        $employee = $this->repository->createEmployee([
            'last_name' => 'Smith',
            'first_name' => 'Amy',
            'email' => 'amy@example.com',
        ]);

        $this->assertSame('employee', $employee->role);
        $this->assertNull($employee->phone);
        $this->assertNotSame('', $employee->password);
        $this->assertNotFalse(password_get_info($employee->password)['algo'] ?? false);
        $this->assertDatabaseHas('users', ['email' => 'amy@example.com', 'role' => 'employee']);
    }

    public function test_create_employee_keeps_optional_values(): void
    {
        $employee = $this->repository->createEmployee([
            'last_name' => 'Smith',
            'first_name' => 'Amy',
            'email' => 'amy2@example.com',
            'phone' => '0102030405',
            'position' => 'Developer',
            'hire_date' => '2024-01-15',
        ]);

        $this->assertSame('0102030405', $employee->phone);
        $this->assertSame('Developer', $employee->position);
    }
}
