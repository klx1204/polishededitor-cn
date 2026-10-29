<script lang="ts">
	import Basics from '$components/mon/basics.svelte';
	import Caught from '$components/mon/caught.svelte';
	import Misc from '$components/mon/misc.svelte';
	import Moves from '$components/mon/moves.svelte';
	import Stats from '$components/mon/stats.svelte';
	import type { Form, Species } from '$extractors/types';
	import { t } from '$lib/i18n.svelte';
	import type { BoxMon, PartyMon } from '$parsers/types';
	import { displayName } from '$parsers/utils';
	import DropdownSelect from '$ui/dropdown-select.svelte';
	import { Button, Heading, Hr, Tabs, TabItem } from 'flowbite-svelte';

	interface MonDrawerProps {
		mon: PartyMon | BoxMon;
		species: Species;
		form: Form;
		PF: 'polished' | 'faithful';
		ondelete: () => void;
	}

	let { mon = $bindable(), species, form, PF, ondelete }: MonDrawerProps = $props();
	let editor = $state('Basics');
</script>

<Heading tag="h4" class="mb-5">{t('edit')} {displayName(mon.nickname)}</Heading>

<div class="hidden sm:block">
	<Tabs
		tabStyle="underline"
		classes={{ active: 'text-white rounded-t-lg dark:bg-purple-500 bg-purple-600' }}
	>
		<TabItem title={t('basics')}>
			<Basics bind:mon {species} {form} {PF} />
		</TabItem>
		<TabItem title={t('stats')}>
			<Stats bind:mon {PF} />
		</TabItem>
		<TabItem title={t('moves')}>
			<Moves bind:mon {form} {PF} />
		</TabItem>
		<TabItem title={t('caughtTab')}>
			<Caught bind:mon {PF} />
		</TabItem>
		<TabItem title={t('misc')}>
			<Misc bind:mon {form} />
		</TabItem>
	</Tabs>
	<div class="ml-4">
		<Button color="red" onclick={ondelete}>{t('deletePokemon')}</Button>
	</div>
</div>

<div class="sm:hidden">
	<DropdownSelect
		bind:value={editor}
		options={['Basics', 'Stats', 'Moves', 'Caught', 'Misc']}
		labelFn={(v) =>
			({
				Basics: t('basics'),
				Stats: t('stats'),
				Moves: t('moves'),
				Caught: t('caughtTab'),
				Misc: t('misc')
			})[v as 'Basics' | 'Stats' | 'Moves' | 'Caught' | 'Misc'] ?? v}
	/>
	<Hr class="my-5" />
	{#if editor === 'Basics'}
		<Basics bind:mon {species} {form} {PF} />
	{:else if editor === 'Stats'}
		<Stats bind:mon {PF} />
	{:else if editor === 'Moves'}
		<Moves bind:mon {form} {PF} />
	{:else if editor === 'Caught'}
		<Caught bind:mon {PF} />
	{:else if editor === 'Misc'}
		<Misc bind:mon {form} />
	{/if}
	<div class="mt-7">
		<Button color="red" onclick={ondelete}>{t('deletePokemon')}</Button>
	</div>
</div>
