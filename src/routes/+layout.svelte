<script lang="ts">
	import { i18n } from '$lib/i18n.svelte';
	import './layout.css';

	let { children } = $props();

	let title = $derived(
		i18n.lang === 'zh'
			? '抛光水晶编辑器 - 宝可梦 抛光水晶 存档修改器'
			: 'Polished Editor - Cheating/Save Editing Tool for Polished Crystal'
	);
	let description = $derived(
		i18n.lang === 'zh'
			? '《宝可梦 抛光水晶》中文存档修改器：修改宝可梦、昵称、背包、图鉴等。支持中英文界面与中文存档名。'
			: 'Cheating tool for Polished Crystal that works by editing your save file via an intuitive UI. Edit Pokemon Stats, Nicknames, Bag Contents, Pokedex Data, and more!'
	);

	$effect(() => {
		document.documentElement.lang = i18n.lang === 'zh' ? 'zh-CN' : 'en';
	});
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="description" content={description} />
</svelte:head>

{@render children()}
