<script setup lang="ts"></script>

<template>
	<section
		class="px-2 dark:bg-zinc-900 gap-8 h-screen flex-col flex justify-center items-center"
	>
		<h1 class="dark:text-white font-bold text-3xl text-center">
			{{ $t('pages./closed.h1') }}
		</h1>

		<button
			class="transition-colors hover:bg-indigo-600 bg-indigo-500 py-2 px-4 rounded-full text-white font-medium"
			@click="console.log('init session')"
		>
			{{ $t('pages./closed.btns.start-session') }}
		</button>
	</section>
</template>
