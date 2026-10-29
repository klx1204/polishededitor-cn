<script lang="ts">
	import Bag from '$components/bag/bag.svelte';
	import Boxes from '$components/boxes/boxes.svelte';
	import Instructions from '$components/instructions.svelte';
	import Party from '$components/party/party.svelte';
	import Player from '$components/player/player.svelte';
	import Pokedex from '$components/pokedex/pokedex.svelte';
	import addresses from '$data/addresses.json';
	import versions from '$data/versions.json';
	import { i18n, t } from '$lib/i18n.svelte';
	import parseSave from '$parsers/parseSave';
	import reverseParseSave from '$parsers/reverseParseSave';
	import type { Data } from '$parsers/types';
	import { retrieve } from '$parsers/utils';
	import RadioSelect from '$ui/radio-select.svelte';
	import { Fileupload, Label, Helper, Toast, Button, Heading, DarkMode, Hr } from 'flowbite-svelte';

	let PF: 'polished' | 'faithful' = $state('polished');
	let data: Data | null = $state(null);
	let files: FileList | null = $state(null);
	let toastMsg: string = $state('');
	let toastStatus: boolean = $state(false);
	let editor: string = $state('Party');

	$effect(() => {
		if (toastMsg) toastStatus = true;
	});

	async function uploadSave(): Promise<void> {
		if (!files?.[0]) return;
		toastStatus = true;
		toastMsg = await validateSave(files[0]);
		try {
			data = parseSave(new Uint8Array(await files[0].arrayBuffer()), PF);
		} catch (error) {
			console.log(error);
			toastMsg = t('unexpectedBug');
		}
		if (toastMsg === t('saveValidated')) {
			setTimeout(() => {
				toastStatus = false;
			}, 5000);
		}
		return;
	}

	async function validateSave(file: File): Promise<string> {
		if (file.size < 32000 || file.size > 33000) {
			return t('notSaveFile');
		}
		const buffer = new Uint8Array(await file.arrayBuffer());
		if (retrieve(buffer, addresses.sSaveVersion, 2) != versions.save) {
			return `${t('wrongVersion')} ${versions.game}.`;
		}
		return t('saveValidated');
	}

	async function downloadSave(): Promise<void> {
		if (!files?.[0] || !data) return;
		Object.assign(document.createElement('a'), {
			href: URL.createObjectURL(
				new Blob([
					reverseParseSave(new Uint8Array(await files[0].arrayBuffer()), data, PF)
						.buffer as ArrayBuffer
				])
			),
			download: `${files[0].name.slice(0, files[0].name.lastIndexOf('.'))}_EDITED${files[0].name.slice(files[0].name.lastIndexOf('.'))}`
		}).click();
	}
</script>

<Toast
	params={{ x: 200, duration: 800 }}
	{toastStatus}
	class="w-max-64 w-fit absolute right-4 top-4 z-10"
>
	{toastMsg}
</Toast>

<header class="flex justify-between mb-5 flex-wrap gap-5">
	<Heading tag="h1">
		{#if i18n.lang === 'zh'}
			<span class="dark:text-purple-500 text-purple-600">抛光水晶</span>编辑器
			<span class="block text-base font-normal text-gray-500 dark:text-gray-400">
				Polished Editor · 宝可梦 抛光水晶 存档修改器
			</span>
		{:else}
			<span class="dark:text-purple-500 text-purple-600">Polished</span> Editor
			<span class="block text-base font-normal text-gray-500 dark:text-gray-400">
				Pokémon Polished Crystal save editor
			</span>
		{/if}
	</Heading>
	<div class="flex gap-3 items-center flex-wrap">
		<div class="inline-flex rounded-lg overflow-hidden border border-gray-200 dark:border-gray-700">
			<button
				class="px-3 py-2 text-sm font-medium {i18n.lang === 'zh'
					? 'bg-purple-600 text-white'
					: 'bg-white dark:bg-gray-800 text-black dark:text-white'}"
				onclick={() => i18n.set('zh')}>中文</button
			>
			<button
				class="px-3 py-2 text-sm font-medium {i18n.lang === 'en'
					? 'bg-purple-600 text-white'
					: 'bg-white dark:bg-gray-800 text-black dark:text-white'}"
				onclick={() => i18n.set('en')}>EN</button
			>
		</div>
		<RadioSelect
			bind:value={PF}
			options={[
				{ text: t('polished'), id: 'polished' },
				{ text: t('faithful'), id: 'faithful' }
			]}
			onchange={uploadSave}
		/>
		<DarkMode
			class="size-10 outline-1 focus:outline-solid outline-gray-100 dark:outline-gray-700"
		/>
	</div>
</header>

<Label for="save" class="pb-2">{t('uploadSave')}</Label>
<div class="flex gap-5 text-nowrap mb-2 flex-wrap">
	<Fileupload id="save" accept=".srm,.sav,.SaveRAM" bind:files onchange={uploadSave} />
	<Button onclick={downloadSave} class="bg-purple-600 dark:bg-purple-500"
		>{t('downloadSave')}</Button
	>
</div>
<Helper>{t('saveHint')}</Helper>

<Instructions />

{#if data}
	<RadioSelect
		bind:value={editor}
		options={[
			{ id: 'Party', text: t('party') },
			{ id: 'Boxes', text: t('boxes') },
			{ id: 'Bag', text: t('bag') },
			{ id: 'Player', text: t('player') },
			{ id: 'Pokedex', text: t('pokedex') }
		]}
	/>
	<Hr class="my-5" />
	{#if editor === 'Party'}<Party bind:party={data.party} player={data.player} {PF} />{/if}
	{#if editor === 'Boxes'}<Boxes bind:boxes={data.boxes} player={data.player} {PF} />{/if}
	{#if editor === 'Bag'}<Bag bind:bag={data.bag} {PF} />{/if}
	{#if editor === 'Player'}<Player bind:player={data.player} />{/if}
	{#if editor === 'Pokedex'}<Pokedex bind:pokedex={data.pokedex} {PF} />{/if}
{/if}
