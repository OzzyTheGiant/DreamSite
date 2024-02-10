<span class="text-white inline-flex">
  <a 
    itemscope 
    itemtype="http://schema.org/ShareAction" 
    rel="me" 
    target="_blank" 
    class="facebook align-middle px-2 py-1 flex items-center mr-2"
    aria-label="Share on Facebook"
    href={`https://www.facebook.com/sharer/sharer.php?u=${articleURI}&title=${articleTitle}`}
    data-href={articleURI}>
    <Fa class="w-4 h-4 mr-2" icon={faFacebook}/>
    Share
  </a>
  <a 
    itemscope
    itemtype="http://schema.org/ShareAction" 
    rel="me" 
    target="_blank" 
    class="twitter align-middle px-2 py-1 flex items-center mr-2"
    aria-label="Share on Twitter"
    href={`https://www.twitter.com/intent/tweet?text=${articleTitle}&url=${articleURI}`}>
    <Fa class="w-4 h-4 mr-2" icon={faTwitter}/>
    Tweet
  </a>
</span>

<script lang="ts">
// TODO: test URLS when sharing
import { faFacebook, faTwitter } from "@fortawesome/free-brands-svg-icons"
import Fa from "svelte-fa"

export let title: string
export let uri: string

$: articleTitle = encodeURIComponent(title)
$: articleURI =encodeURIComponent(uri)
</script>

<style>
.facebook { background-color: #3B5998; }
.twitter { background-color: #00ACED; }
</style>
