<script lang="ts">
	import type { Form } from '$extractors/types';
	import { t } from '$lib/i18n.svelte';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import { NumberInput, RadioSelect } from '$ui';
	import { Heading, Label, P } from 'flowbite-svelte';

	let { mon = $bindable(), form }: { mon: PartyMon | BoxMon; form: Form } = $props();
	function changePokerus(): void {
		if (mon.pokerus.strain === 'None' || mon.pokerus.strain === 'Cured') {
			mon.pokerus = { strain: mon.pokerus.strain };
		} else {
			mon.pokerus.daysRemaining = Math.max(mon.pokerus.strain as number, 1);
		}
	}
	//Eggs cannot have HP
	function toggleEgg(): void {
		if (mon.isEgg) {
			if ('currentHP' in mon) {
				mon.currentHP = 0;
				mon.status = { name: 'None' };
			}
		} else {
			if ('currentHP' in mon) {
				mon.currentHP = mon.stats[0];
			}
		}
	}
</script>

{#if mon.isEgg}
	<Heading tag="h5" class="mb-[-10px]">{t('hatchCycles')}</Heading>
{:else}
	<Heading tag="h5" class="mb-[-10px]">{t('happiness')}</Heading>
{/if}
<NumberInput bind:value={mon.happiness} min={0} max={255} />

<Heading tag="h5" class="my-5">{t('gender')}</Heading>
{#if form.hasGender}
	<RadioSelect
		bind:value={mon.gender}
		options={[
			{ text: t('male'), id: 'Male' },
			{ text: t('female'), id: 'Female' }
		]}
	/>
{:else}
	<P italic>{t('genderless')}</P>
{/if}

<Heading tag="h5" class="mt-5 mb-5">{t('shininess')}</Heading>
<RadioSelect
	bind:value={mon.shininess}
	options={[
		{ text: t('shiny'), id: 'Shiny' },
		{ text: t('notShiny'), id: 'Not Shiny' }
	]}
/>

<Heading tag="h5" class="mt-5 mb-5">{t('isEgg')}</Heading>
<RadioSelect
	bind:value={mon.isEgg}
	options={[
		{ text: t('isEggTrue'), id: true },
		{ text: t('isEggFalse'), id: false }
	]}
	onchange={toggleEgg}
/>

<Heading tag="h5" class="mt-5 mb-5 sm:mb-2">{t('pokerus')}</Heading>

<div class="flex gap-x-8 gap-y-5 flex-wrap items-center">
	<div class="hidden sm:block my-3">
		<RadioSelect
			bind:value={mon.pokerus.strain}
			options={[
				{ text: t('none'), id: 'None' },
				{ text: t('cured'), id: 'Cured' },
				{ text: t('strain') + ' 1', id: 1 },
				{ text: t('strain') + ' 2', id: 2 },
				{ text: t('strain') + ' 3', id: 3 },
				{ text: t('strain') + ' 4', id: 4 }
			]}
			onchange={changePokerus}
		/>
	</div>

	<div class="flex gap-3 flex-wrap sm:hidden">
		<RadioSelect
			bind:value={mon.pokerus.strain}
			options={[
				{ text: t('none'), id: 'None' },
				{ text: t('cured'), id: 'Cured' }
			]}
			onchange={changePokerus}
		/>
		<RadioSelect
			bind:value={mon.pokerus.strain}
			options={[
				{ text: t('strain') + ' 1', id: 1 },
				{ text: t('strain') + ' 2', id: 2 },
				{ text: t('strain') + ' 3', id: 3 },
				{ text: t('strain') + ' 4', id: 4 }
			]}
			onchange={changePokerus}
		/>
	</div>

	{#if 'daysRemaining' in mon.pokerus}
		<div class="flex flex-col">
			<Label class="mb-[-10px]">{t('daysRemaining')}</Label>
			<NumberInput
				bind:value={mon.pokerus.daysRemaining!}
				min={1}
				max={mon.pokerus.strain as number}
			/>
		</div>
	{/if}
</div>
