<script lang="ts">
	import { t } from '$lib/i18n.svelte';
	import { P, Li, List } from 'flowbite-svelte';
</script>

<P class="mt-5">
	{t('intro')}
	<br />
	{t('contact')}
	<br />
	{t('disclaimer')}
	<br /> <br />
	{t('instructions')}
</P>
<List tag="ol" class="dark:text-white text-black mb-5">
	<Li>{t('step1')}</Li>
	<Li>{t('step2')}</Li>
	<Li>{t('step3')}</Li>
	<Li>{t('step4')}</Li>
	<Li>{t('step5')}</Li>
</List>
<P class="mb-5">
	<em class="font-italic">{t('credits')}</em><br />
	<a href="https://github.com/klx1204/polishededitor-cn" class="underline text-blue-500"
		>{t('github')}</a
	>
</P>
