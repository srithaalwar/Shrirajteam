import { useState, useEffect, useRef } from "react";
import { Share2, X, Search, Copy, Check } from "lucide-react";

const SHARE_SERVICES = [
  {
    name: "Facebook",
    color: "#1877F2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 4.991 3.243 9.21 7.758 10.682V15.02H5.413v-2.947h2.345V9.983c0-2.318 1.38-3.6 3.497-3.6.998 0 2.043.178 2.043.178v2.252h-1.15c-1.134 0-1.488.704-1.488 1.425v1.71h2.532l-.405 2.947h-2.127v7.736C20.757 21.283 24 17.064 24 12.073z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    name: "WhatsApp",
    color: "#25D366",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://wa.me/?text=${encodeURIComponent(title + " " + url)}`,
  },
  {
    name: "Telegram",
    color: "#26A5E4",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
  },
  {
    name: "Reddit",
    color: "#FF4500",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0zm5.01 4.744c.688 0 1.25.561 1.25 1.249a1.25 1.25 0 0 1-2.498.056l-2.597-.547-.8 3.747c1.824.07 3.48.632 4.674 1.488.308-.309.73-.491 1.207-.491.968 0 1.754.786 1.754 1.754 0 .716-.435 1.333-1.01 1.614a3.111 3.111 0 0 1 .042.52c0 2.694-3.13 4.87-7.004 4.87-3.874 0-7.004-2.176-7.004-4.87 0-.183.015-.366.043-.534A1.748 1.748 0 0 1 4.028 12c0-.968.786-1.754 1.754-1.754.463 0 .898.196 1.207.49 1.207-.883 2.878-1.43 4.744-1.487l.885-4.182a.342.342 0 0 1 .14-.197.35.35 0 0 1 .238-.042l2.906.617a1.214 1.214 0 0 1 1.108-.701zM9.25 12C8.561 12 8 12.562 8 13.25c0 .687.561 1.248 1.25 1.248.687 0 1.248-.561 1.248-1.249 0-.688-.561-1.249-1.249-1.249zm5.5 0c-.687 0-1.248.561-1.248 1.25 0 .687.561 1.248 1.249 1.248.688 0 1.249-.561 1.249-1.249 0-.687-.562-1.249-1.25-1.249zm-5.466 3.99a.327.327 0 0 0-.231.094.33.33 0 0 0 0 .463c.842.842 2.484.913 2.961.913.477 0 2.105-.056 2.961-.913a.361.361 0 0 0 .029-.463.33.33 0 0 0-.464 0c-.547.533-1.684.73-2.512.73-.828 0-1.979-.196-2.512-.73a.326.326 0 0 0-.232-.095z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://www.reddit.com/submit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    name: "Threads",
    color: "#000000",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.472 12.01v-.017c.03-3.579.879-6.43 2.525-8.482C5.845 1.205 8.6.024 12.18 0h.014c2.746.02 5.043.725 6.826 2.098 1.677 1.29 2.858 3.13 3.509 5.467l-2.04.569c-1.104-3.96-3.898-5.984-8.304-6.015-2.91.022-5.11.936-6.54 2.717C4.307 6.504 3.616 8.914 3.589 12c.027 3.086.718 5.496 2.057 7.164 1.43 1.783 3.631 2.698 6.54 2.717 2.623-.02 4.358-.631 5.689-2.046 1.579-1.671 1.62-3.583 1.573-4.92-.013-.394-.024-.734-.013-1.057-.709.17-1.43.25-2.164.245-1.636 0-3.137-.432-4.337-1.25-1.473-1.003-2.268-2.518-2.268-4.272 0-3.51 2.79-5.763 7.022-5.763 1.282 0 2.432.2 3.39.567.888.34 1.64.846 2.232 1.504l-1.467 1.363c-.893-.953-2.275-1.435-4.11-1.435-2.818 0-4.985 1.388-4.985 3.763 0 1.115.444 1.998 1.284 2.564.883.593 2.114.903 3.556.903.743 0 1.452-.09 2.106-.264.013-.213.022-.429.032-.642.041-1.123.087-2.399-.253-3.476-.296-.941-.968-1.452-1.994-1.52-.874-.056-1.613.206-2.127.741-.467.484-.725 1.156-.733 1.942l-2.037-.033c.024-1.341.492-2.491 1.32-3.362.866-.91 2.065-1.393 3.478-1.393h.052c2.675.065 4.073 1.634 4.515 4.937.193 1.42.137 2.836.083 4.211-.014.361-.027.718-.036 1.076v.042c0 .263.005.504.01.743.038 1.836-.007 4.4-2.137 6.681C17.274 23.213 15.157 24 12.186 24z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://www.threads.net/intent/post?text=${encodeURIComponent(title + " " + url)}`,
  },
  {
    name: "Mix",
    color: "#FF8226",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm6.5 8.5h-4v7a1 1 0 01-2 0v-7H8.5a1 1 0 010-2h10a1 1 0 010 2z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://mix.com/add?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Mastodon",
    color: "#6364FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M23.268 5.313c-.35-2.578-2.617-4.61-5.304-5.004C17.51.242 15.792 0 11.813 0h-.03c-3.98 0-4.835.242-5.288.309C3.882.692 1.496 2.518.917 5.127.64 6.412.61 7.837.661 9.143c.074 1.874.088 3.745.26 5.611.118 1.24.325 2.47.62 3.68.55 2.237 2.777 4.098 4.96 4.857 2.336.792 4.849.923 7.256.38.265-.061.527-.132.786-.213.585-.184 1.27-.39 1.774-.753a.057.057 0 0 0 .023-.043v-1.809a.052.052 0 0 0-.02-.041.053.053 0 0 0-.046-.01 20.282 20.282 0 0 1-4.709.545c-2.73 0-3.463-1.284-3.674-1.818a5.593 5.593 0 0 1-.319-1.433.053.053 0 0 1 .066-.054c1.517.363 3.072.546 4.632.546.376 0 .75 0 1.125-.01 1.57-.044 3.224-.124 4.768-.422.038-.008.077-.015.11-.024 2.435-.464 4.753-1.92 4.989-5.604.008-.145.03-1.52.03-1.67.002-.512.167-3.63-.024-5.545zm-3.748 9.195h-2.561V8.29c0-1.309-.55-1.976-1.67-1.976-1.23 0-1.846.79-1.846 2.35v3.403h-2.546V8.663c0-1.56-.617-2.35-1.848-2.35-1.112 0-1.668.668-1.67 1.977v6.218H4.822V8.102c0-1.31.337-2.35 1.011-3.12.696-.77 1.608-1.164 2.74-1.164 1.311 0 2.302.5 2.962 1.498l.638 1.06.638-1.06c.66-.999 1.65-1.498 2.96-1.498 1.13 0 2.043.395 2.74 1.164.675.77 1.012 1.81 1.012 3.12z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://mastodon.social/share?text=${encodeURIComponent(title + " " + url)}`,
  },
  {
    name: "Email",
    color: "#6D6D6D",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
      </svg>
    ),
    getUrl: (url, title) => `mailto:?subject=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
  {
    name: "Message",
    color: "#34C759",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20 2H4c-1.1 0-2 .9-2 2v18l4-4h14c1.1 0 2-.9 2-2V4c0-1.1-.9-2-2-2z"/>
      </svg>
    ),
    getUrl: (url, title) => `sms:?body=${encodeURIComponent(title + " " + url)}`,
  },
  {
    name: "Gmail",
    color: "#EA4335",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://mail.google.com/mail/?view=cm&su=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`,
  },
  {
    name: "LinkedIn",
    color: "#0A66C2",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    name: "Google Translate",
    color: "#4285F4",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12.87 15.07l-2.54-2.51.03-.03A17.52 17.52 0 0014.07 6H17V4h-7V2H8v2H1v2h11.17C11.5 7.92 10.44 9.75 9 11.35 8.07 10.32 7.3 9.19 6.69 8h-2c.73 1.63 1.73 3.17 2.98 4.56l-5.09 5.02L4 19l5-5 3.11 3.11.76-2.04zM18.5 10h-2L12 22h2l1.12-3h4.75L21 22h2l-4.5-12zm-2.62 7l1.62-4.33L19.12 17h-3.24z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://translate.google.com/translate?u=${encodeURIComponent(url)}`,
  },
  {
    name: "Bluesky",
    color: "#0085FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 10.8c-1.087-2.114-4.046-6.053-6.798-7.995C2.566.944 1.561 1.266.902 1.902.139 2.66-.018 3.748.004 4.62.022 5.342.61 11.77.679 12.526c.324 3.279 2.594 4.482 5.074 4.19-.229.23-.471.49-.674.725-.508.599-.908 1.265-1.016 1.792-.241 1.195.23 2.246 1.11 2.793 1.148.724 2.584.306 3.43-.452.677-.619 1.144-1.533 1.397-2.444.253.91.72 1.825 1.397 2.444.846.758 2.282 1.176 3.43.452.88-.547 1.351-1.598 1.11-2.793-.108-.527-.508-1.193-1.016-1.792a9.337 9.337 0 0 0-.674-.725c2.48.292 4.75-.911 5.074-4.19.069-.756.657-7.184.675-7.906.022-.872-.135-1.96-.898-2.718-.659-.636-1.664-.958-4.3 1.203C16.046 4.747 13.087 8.686 12 10.8z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://bsky.app/intent/compose?text=${encodeURIComponent(title + " " + url)}`,
  },
  {
    name: "Pinterest",
    color: "#E60023",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 0C5.373 0 0 5.373 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738a.36.36 0 0 1 .083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.632-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12S18.627 0 12 0z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(title)}`,
  },
  {
    name: "Messenger",
    color: "#0084FF",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M12 0C5.373 0 0 5.149 0 11.5c0 3.607 1.786 6.832 4.591 8.933V24l4.184-2.299c1.117.308 2.301.474 3.524.474 6.627 0 12-5.149 12-11.5S18.627 0 12 0zm1.191 15.494l-3.054-3.253-5.965 3.253 6.559-6.971 3.128 3.253 5.891-3.253-6.559 6.971z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://www.facebook.com/dialog/send?link=${encodeURIComponent(url)}&app_id=291494307733634`,
  },
  {
    name: "Pocket",
    color: "#EF3F56",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M18.813 10.259l-5.625 5.395a1.75 1.75 0 01-2.376 0L5.187 10.26a1.75 1.75 0 012.376-2.575l3.437 3.299 3.438-3.3a1.75 1.75 0 012.375 2.576zM21.938.75H2.063A2.063 2.063 0 000 2.813v8.25C0 17.1 5.4 22.5 12 22.5s12-5.4 12-11.438v-8.25A2.063 2.063 0 0021.938.75z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://getpocket.com/edit?url=${encodeURIComponent(url)}&title=${encodeURIComponent(title)}`,
  },
  {
    name: "Teams",
    color: "#6264A7",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M20.625 5.813a2.813 2.813 0 100-5.626 2.813 2.813 0 000 5.626zm-3.375 1.5h-3.75a5.25 5.25 0 00-5.25 5.25v4.125a.75.75 0 00.75.75h.75v3.75a.75.75 0 001.5 0v-3.75H12v3.75a.75.75 0 001.5 0v-3.75h.75a.75.75 0 00.75-.75v-4.125a5.25 5.25 0 00-5.25-5.25V7.313h8.25v2.437a5.25 5.25 0 00-5.25 5.25v.375h4.5v-.375a.75.75 0 011.5 0v.375h.75a.75.75 0 00.75-.75v-4.125a3.75 3.75 0 00-3.75-3.75zM8.625 5.063a2.438 2.438 0 100-4.876 2.438 2.438 0 000 4.876z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://teams.microsoft.com/share?href=${encodeURIComponent(url)}&msgText=${encodeURIComponent(title)}`,
  },
  {
    name: "Amazon Wish List",
    color: "#FF9900",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" width="20" height="20">
        <path d="M13.958 10.09c0 1.232.029 2.256-.591 3.351-.502.891-1.301 1.438-2.186 1.438-1.214 0-1.922-.924-1.922-2.292 0-2.692 2.415-3.182 4.7-3.182v.685zm3.186 7.705c-.209.187-.512.2-.747.074-1.052-.874-1.24-1.28-1.814-2.113-1.734 1.767-2.962 2.296-5.209 2.296-2.66 0-4.731-1.641-4.731-4.925 0-2.565 1.391-4.309 3.37-5.164 1.715-.754 4.11-.891 5.942-1.095v-.41c0-.753.06-1.642-.383-2.294-.385-.579-1.124-.818-1.775-.818-1.205 0-2.277.618-2.54 1.897-.054.285-.261.567-.547.58l-3.065-.33c-.259-.056-.546-.267-.47-.663C5.783 1.754 8.714.5 11.388.5c1.39 0 3.209.37 4.307 1.421C17.039 3.09 17 5.047 17 7.1v4.674c0 1.406.583 2.024 1.132 2.783.19.267.232.586-.01.784l-2.978 2.454zm2.624 2.855C17.58 22.446 14.853 24 12 24 7.62 24 3.732 21.671 1.5 18.176c-.195-.31.018-.478.266-.32C3.987 19.635 7.25 20.784 10.655 20.784c2.386 0 5.026-.496 7.444-1.515.379-.162.698.248.368.581zM21.894 19.96c-.271-.347-1.764-.164-2.437-.082-.206.025-.238-.154-.052-.285 1.195-.839 3.154-.597 3.382-.316.228.281-.059 2.246-1.178 3.183-.172.144-.335.067-.259-.122.251-.629.814-2.031.544-2.378z"/>
      </svg>
    ),
    getUrl: (url, title) => `https://www.amazon.com/wishlist/add?u=${encodeURIComponent(url)}`,
  },
];

// ─── Main Share Modal Component ───────────────────────────────────────────────
// Props:
//   mode="product"  → uses productId + variantId to build URL (default)
//   mode="custom"   → uses shareUrl directly (for referral links, etc.)
//   triggerAs="button" → renders a styled <button> instead of the circle icon
//   triggerLabel    → label text when triggerAs="button"
export default function ShareModal({
  // Product mode props
  productId,
  variantId,
  selectedVariant,
  productTitle = "Check out this product!",
  // Custom URL mode props
  mode = "product",       // "product" | "custom"
  shareUrl = "",          // used when mode="custom"
  // Trigger appearance
  triggerAs = "icon",     // "icon" | "button"
  triggerLabel = "Share", // label when triggerAs="button"
  triggerClassName = "",  // extra class on trigger
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [copied, setCopied] = useState(false);
  const modalRef = useRef(null);
  const searchRef = useRef(null);

  const currentUrl = mode === "custom"
    ? shareUrl
    : (typeof window !== "undefined"
        ? `${window.location.origin}/product/${productId}/?variant=${variantId || selectedVariant?.id || ""}`
        : "");

  const filteredServices = SHARE_SERVICES.filter(s =>
    s.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleShareClick = () => {
    setIsOpen(true);
    setSearchQuery("");
  };

  const handleClose = () => {
    setIsOpen(false);
    setSearchQuery("");
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
    } catch {
      const ta = document.createElement("textarea");
      ta.value = currentUrl;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
    }
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleServiceClick = (service) => {
    window.open(service.getUrl(currentUrl, productTitle), "_blank", "noopener,noreferrer");
  };

  // Close on outside click
  useEffect(() => {
    const handleOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) handleClose();
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleOutside);
      setTimeout(() => searchRef.current?.focus(), 100);
    }
    return () => document.removeEventListener("mousedown", handleOutside);
  }, [isOpen]);

  // Close on Escape
  useEffect(() => {
    const handleKey = (e) => { if (e.key === "Escape") handleClose(); };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, []);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600&display=swap');

        .share-root * { box-sizing: border-box; font-family: 'DM Sans', sans-serif; }

        .share-trigger {
          display: inline-flex; align-items: center; justify-content: center;
          width: 40px; height: 40px; border-radius: 50%;
          border: 1.5px solid #e0e0e0; background: #fff;
          cursor: pointer; transition: all 0.2s ease;
          color: #444;
        }
        .share-trigger:hover { background: #f5f5f5; border-color: #bbb; color: #111; transform: scale(1.05); }

        /* Button trigger — wraps whatever button the parent renders */
        .share-trigger-btn {
          display: inline-flex; align-items: center; justify-content: center; gap: 8px;
          cursor: pointer; border: none; background: transparent; padding: 0;
          font: inherit; color: inherit; width: 100%;
        }

        .share-overlay {
          position: fixed; inset: 0; background: rgba(0,0,0,0.35);
          backdrop-filter: blur(3px);
          display: flex; align-items: center; justify-content: center;
          z-index: 9999;
          animation: fadeInOverlay 0.2s ease;
        }
        @keyframes fadeInOverlay { from { opacity: 0; } to { opacity: 1; } }

        .share-modal {
          background: #fff; border-radius: 14px;
          width: 520px; max-width: 95vw;
          padding: 20px 20px 16px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.18), 0 4px 16px rgba(0,0,0,0.08);
          animation: slideUp 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
          position: relative;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(30px) scale(0.96); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .share-close-btn {
          position: absolute; top: 14px; right: 14px;
          width: 28px; height: 28px; border-radius: 50%;
          border: none; background: #f0f0f0;
          cursor: pointer; display: flex; align-items: center; justify-content: center;
          color: #666; transition: background 0.2s, color 0.2s;
        }
        .share-close-btn:hover { background: #e0e0e0; color: #111; }

        .share-search-wrap {
          position: relative; margin-bottom: 16px;
        }
        .share-search-icon {
          position: absolute; left: 12px; top: 50%; transform: translateY(-50%);
          color: #aaa; pointer-events: none;
        }
        .share-search {
          width: 100%; padding: 10px 14px 10px 38px;
          border: 1.5px solid #e8e8e8; border-radius: 10px;
          font-size: 14px; color: #333; background: #fafafa;
          outline: none; transition: border-color 0.2s, background 0.2s;
        }
        .share-search:focus { border-color: #bbb; background: #fff; }
        .share-search::placeholder { color: #bbb; }

        .share-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 4px;
          max-height: 340px;
          overflow-y: auto;
          padding-right: 4px;
          scrollbar-width: thin;
          scrollbar-color: #ddd transparent;
        }
        .share-grid::-webkit-scrollbar { width: 5px; }
        .share-grid::-webkit-scrollbar-thumb { background: #ddd; border-radius: 10px; }

        .share-service-btn {
          display: flex; align-items: center; gap: 10px;
          padding: 9px 12px; border-radius: 8px;
          border: none; background: transparent;
          cursor: pointer; text-align: left;
          transition: background 0.15s;
          color: #222;
        }
        .share-service-btn:hover { background: #f5f5f5; }

        .share-icon-wrap {
          width: 34px; height: 34px; border-radius: 8px;
          display: flex; align-items: center; justify-content: center;
          flex-shrink: 0; color: #fff;
        }
        .share-service-name {
          font-size: 13px; font-weight: 500;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
        }

        .share-footer {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid #f0f0f0;
          display: flex; align-items: center; justify-content: space-between;
          gap: 8px;
        }
        .share-url-display {
          flex: 1; font-size: 12px; color: #888;
          white-space: nowrap; overflow: hidden; text-overflow: ellipsis;
          background: #f7f7f7; padding: 7px 10px; border-radius: 7px;
        }
        .share-copy-btn {
          display: flex; align-items: center; gap: 6px;
          padding: 7px 14px; border-radius: 7px;
          border: 1.5px solid #e0e0e0; background: #fff;
          font-size: 13px; font-weight: 500; color: #333;
          cursor: pointer; transition: all 0.2s; white-space: nowrap;
          flex-shrink: 0;
        }
        .share-copy-btn:hover { background: #f5f5f5; border-color: #bbb; }
        .share-copy-btn.copied { border-color: #22c55e; color: #16a34a; background: #f0fdf4; }

        .share-brand {
          text-align: center; margin-top: 10px;
          font-size: 11px; color: #bbb;
        }
        .share-brand a { color: #bbb; text-decoration: none; }
        .share-brand a:hover { color: #888; }

        .no-results { grid-column: 1/-1; text-align: center; padding: 24px; color: #aaa; font-size: 14px; }
      `}</style>

      <div className="share-root">
        {/* Trigger — icon circle (default) or styled button */}
        {triggerAs === "button" ? (
          <button
            className={triggerClassName}
            onClick={handleShareClick}
            title="Share"
          >
            {triggerLabel}
          </button>
        ) : (
          <div className="share-trigger" onClick={handleShareClick} title="Share product URL">
            <Share2 size={18} />
          </div>
        )}

        {/* Modal */}
        {isOpen && (
          <div className="share-overlay">
            <div className="share-modal" ref={modalRef}>
              {/* Close */}
              <button className="share-close-btn" onClick={handleClose} aria-label="Close">
                <X size={14} />
              </button>

              {/* Search */}
              <div className="share-search-wrap">
                <Search size={15} className="share-search-icon" />
                <input
                  ref={searchRef}
                  className="share-search"
                  placeholder="Find any service"
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                />
              </div>

              {/* Services Grid */}
              <div className="share-grid">
                {filteredServices.length > 0 ? (
                  filteredServices.map((service) => (
                    <button
                      key={service.name}
                      className="share-service-btn"
                      onClick={() => handleServiceClick(service)}
                      title={`Share on ${service.name}`}
                    >
                      <div className="share-icon-wrap" style={{ background: service.color }}>
                        {service.icon}
                      </div>
                      <span className="share-service-name">{service.name}</span>
                    </button>
                  ))
                ) : (
                  <div className="no-results">No services found for "{searchQuery}"</div>
                )}
              </div>

              {/* Footer: URL + Copy */}
              <div className="share-footer">
                <div className="share-url-display" title={currentUrl}>{currentUrl}</div>
                <button
                  className={`share-copy-btn ${copied ? "copied" : ""}`}
                  onClick={handleCopyLink}
                >
                  {copied ? <Check size={14} /> : <Copy size={14} />}
                  {copied ? "Copied!" : "Copy link"}
                </button>
              </div>

              {/* Brand */}
              <div className="share-brand">
                <a href="https://www.addtoany.com" target="_blank" rel="noopener noreferrer">
                  + AddToAny
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}