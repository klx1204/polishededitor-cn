<script lang="ts">
	import keyboard from '$data/keyboard.json';
	import { i18n, isSupportedZhChar, t } from '$lib/i18n.svelte';
	import { displayName } from '$parsers/utils';
	import { Button, Drawer, P } from 'flowbite-svelte';

	let {
		value = $bindable(),
		maxLength,
		maxBytes = maxLength,
		class: className = ''
	}: { value: string[]; maxLength: number; maxBytes?: number; class?: string } = $props();

	let showKeyboard = $state(false);
	let zhText = $state('');
	let zhWarning = $state('');

	let usedBytes = $derived(value.reduce((total, ch) => total + (isSupportedZhChar(ch) ? 2 : 1), 0));

	function openKeyboard(): void {
		zhText = value.filter((ch) => !ch.startsWith('\uE000')).join('');
		zhWarning = '';
		showKeyboard = true;
	}

	function applyChinese(): void {
		const chars = Array.from(zhText);
		const unsupported = chars.filter((ch) => !isSupportedZhChar(ch));
		const accepted = chars.filter((ch) => isSupportedZhChar(ch));
		const bytes = accepted.length * 2;
		if (bytes > maxBytes - 1) {
			zhWarning = `${t('unknownChars')} (${bytes}/${maxBytes - 1} bytes)`;
		}
		value = accepted.slice(0, Math.floor((maxBytes - 1) / 2));
		if (unsupported.length) {
			zhWarning = `${t('unknownChars')}: ${unsupported.join(' ')}`;
		}
		if (!zhWarning) showKeyboard = false;
	}

	function append(char: string): void {
		if (usedBytes + 1 <= maxBytes - 1 && value.length < maxLength) {
			value = [...value, char];
			if (usedBytes >= maxBytes - 1) showKeyboard = false;
		}
	}
</script>

<Button
	class={`${className} text-black dark:text-white !ring-purple-300`}
	color="dark"
	outline
	onclick={openKeyboard}
>
	{displayName(value)}
</Button>

<Drawer placement="bottom" bind:open={showKeyboard} class="p-0 h-full">
	<div class="h-full flex flex-col">
		<div class="sticky top-0 bg-white dark:bg-gray-800 p-4 z-10 shadow-sm">
			<div class="max-w-2xl mx-auto">
				<P class="text-sm font-medium">
					{t('editingText')} ({usedBytes}/{maxBytes} bytes · {value.length}/{maxLength}
					{t('characters')})
				</P>
				<div
					class="mt-4 p-3 bg-gray-50 dark:bg-gray-700 rounded-md border border-gray-200 dark:border-gray-600"
				>
					<P class="text-sm">{displayName(value)}|</P>
				</div>
				{#if i18n.lang === 'zh'}
					<div class="mt-4 flex gap-2 flex-wrap">
						<input
							class="flex-1 min-w-48 rounded-md border border-gray-300 dark:border-gray-600 bg-transparent px-3 py-2 text-black dark:text-white"
							bind:value={zhText}
							placeholder="输入或粘贴中文名（使用系统输入法）"
							autocomplete="off"
							spellcheck="false"
						/>
						<Button color="purple" onclick={applyChinese}>应用中文</Button>
					</div>
					{#if zhWarning}
						<P class="text-xs text-amber-600 dark:text-amber-400 mt-2">{zhWarning}</P>
					{/if}
				{/if}
			</div>
		</div>

		<div class="flex-1 overflow-y-auto p-4">
			<div class="max-w-2xl mx-auto grid grid-cols-6 sm:grid-cols-8 md:grid-cols-10 gap-2">
				{#each keyboard as char}
					<Button
						color="light"
						size="sm"
						class="min-h-12 p-2"
						onclick={() => {
							append(char);
							if (usedBytes >= maxBytes - 1) showKeyboard = false;
						}}
					>
						<P class="text-sm">{char}</P>
					</Button>
				{/each}
			</div>
		</div>

		<div
			class="sticky bottom-0 bg-white dark:bg-gray-800 p-4 z-10 shadow-[0_-2px_10px_rgba(0,0,0,0.1)]"
		>
			<div class="max-w-2xl mx-auto flex gap-2">
				<Button
					color="red"
					class="flex-1"
					onclick={() => {
						if (value.length > 0) {
							value = value.slice(0, -1);
						}
					}}
				>
					{t('backspace')}
				</Button>
				<Button
					color="green"
					class="flex-1"
					disabled={value.length === 0}
					onclick={() => (showKeyboard = false)}
				>
					{t('done')}
				</Button>
			</div>
		</div>
	</div>
</Drawer>
