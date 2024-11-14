<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up()
    {
        Schema::create('tasks', function (Blueprint $table) {
            $table->uuid('id')->primary();
            $table->string('title');
            $table->text('description');
            $table->enum('priority', ['high', 'medium', 'low']);
            $table->string('task_type')->nullable(); 
            $table->unsignedBigInteger('task_type_id')->nullable(); 
            $table->date('startDate');
            $table->date('endDate');
            $table->time('startTime');
            $table->time('endTime')->nullable();
            $table->string('image')->nullable();
            $table->string('alt')->nullable();
            $table->integer('progress')->default(0);
            $table->timestamps();

            $table->unsignedBigInteger('user_id')->nullable();
            $table->foreign('user_id')->references('user_id')->on('users')->onDelete('cascade');

            // $table->foreign('task_type_id')->references('id')->on('task_types')->onDelete('set null');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('tasks');
    }
};
