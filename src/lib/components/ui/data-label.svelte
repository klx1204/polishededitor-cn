<script lang="ts">
	import { dn, i18n, isTranslated, type NameKind, type PF as PFType } from '$lib/i18n.svelte';

	interface DataLabelProps {
		kind: NameKind;
		value: string;
		PF?: PFType;
		inline?: boolean;
		class?: string;
	}

	let {
		kind,
		value,
		PF = 'polished',
		inline = false,
		class: className = ''
	}: DataLabelProps = $props();

	let localized = $derived(dn(kind, value, PF));
	let showEnglish = $derived(
		i18n.lang === 'zh' && isTranslated(kind, value) && localized !== value
	);
</script>

{#if i18n.lang === 'en' || !showEnglish}
	<span class={className}>{i18n.lang === 'zh' ? localized : value}</span>
{:else if inline}
	<span class="inline-flex items-baseline gap-2 {className}">
		<span>{localized}</span>
		<span class="text-[11px] font-normal text-gray-500 dark:text-gray-400">{value}</span>
	</span>
{:else}
	<span class="inline-flex flex-col leading-tight {className}">
		<span>{localized}</span>
		<span class="text-[11px] font-normal text-gray-500 dark:text-gray-400">{value}</span>
	</span>
{/if}
