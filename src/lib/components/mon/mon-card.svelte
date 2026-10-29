<script lang="ts">
	import MonDrawer from '$components/mon/mon-drawer.svelte';
	import pokemon from '$data/pokemon.json';
	import { dn, t } from '$lib/i18n.svelte';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import { displayName } from '$parsers/utils';
	import { ColoredCard, Heal, Healthbar, ItemIcon, MonSprite, TypeIcon, DataLabel } from '$ui';
	import { Heading, P, Button, Drawer } from 'flowbite-svelte';
	import { EditSolid } from 'flowbite-svelte-icons';

	interface MonCardProps {
		mon: PartyMon | BoxMon;
		PF: 'polished' | 'faithful';
		ondelete: () => void;
	}
	let { mon = $bindable(), PF, ondelete }: MonCardProps = $props();
	let species = $derived(pokemon[PF].find((p) => p.name === mon.species)!);
	let form = $derived(species.forms.find((f) => f.name === mon.form)!);
	let open = $state(false);
	let innerHeight = $state(0);
	let innerWidth = $state(0);
</script>

<ColoredCard types={form.types}>
	<div class="flex gap-1 mb-3">
		<MonSprite {mon} {PF} />
		<div class="flex flex-col justify-between">
			<Heading tag="h5">{displayName(mon.nickname)}</Heading>
			<div class="flex gap-3">
				<ItemIcon heldItem={mon.heldItem} {PF} />
				{#each form.types as type}
					<TypeIcon {type} />
				{/each}
			</div>
		</div>
	</div>
	{#if 'currentHP' in mon && !mon.isEgg}
		<Healthbar {mon} />
	{/if}
	<P>Lv. {mon.level}</P>
	<P>{t('heldItem')}: <DataLabel kind="item" value={mon.heldItem} {PF} inline /></P>
	<P>{t('ability')}: <DataLabel kind="ability" value={mon.ability} {PF} inline /></P>
	<P>{t('nature')}: <DataLabel kind="nature" value={mon.nature} {PF} inline /></P>
	<div class="flex absolute bottom-5 right-5 gap-3">
		{#if 'currentHP' in mon && !mon.isEgg && (mon.status.name != 'None' || mon.currentHP != mon.stats[0])}
			<Heal bind:mon {PF} />
		{/if}
		<Button
			class="p-2! border-gray-300 hover:bg-gray-300 size-11"
			outline
			color="dark"
			onclick={() => (open = true)}><EditSolid class="text-gray-600 dark:text-gray-400" /></Button
		>
	</div>
</ColoredCard>
<Drawer
	bind:open
	placement={innerWidth > innerHeight ? 'right' : 'bottom'}
	class={innerWidth > innerHeight ? 'h-full w-[75%]' : 'h-[85%] w-full'}
	><MonDrawer
		bind:mon
		{species}
		{form}
		{PF}
		ondelete={() => {
			ondelete();
			open = false;
		}}
	/></Drawer
>
<svelte:window bind:innerWidth bind:innerHeight />
