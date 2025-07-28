import { FileText, BookOpen, Image, Video } from 'lucide-react';
import { GlassCard } from '@/components/GlassCard';
import { ChakraOrb } from '@/components/ChakraOrb';

export default function Content() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between animate-fade-slide-up">
        <div className="flex items-center gap-4">
          <div className="relative">
            <ChakraOrb chakra="throat" size="md" className="opacity-80" />
            <FileText className="w-8 h-8 text-white absolute inset-0 m-auto" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white font-display">Content Management</h1>
            <p className="text-white/60">Manage blog posts, articles, and media content</p>
          </div>
        </div>
      </div>

      {/* Coming Soon Message */}
      <GlassCard className="p-12 text-center animate-fade-slide-up" style={{ animationDelay: '150ms' }}>
        <ChakraOrb chakra="throat" size="lg" className="mx-auto mb-6 opacity-60" />
        <h2 className="text-2xl font-bold text-white font-display mb-4">Content Management System Coming Soon</h2>
        <p className="text-white/60 mb-8 max-w-2xl mx-auto">
          We're developing a comprehensive content management system for blogs, articles, 
          meditation guides, and multimedia resources. Create, edit, and publish spiritual content 
          with our intuitive editor.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mt-8">
          <div className="p-6 bg-white/5 rounded-xl">
            <BookOpen className="w-8 h-8 text-chakra-throat mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Blog Posts</h3>
            <p className="text-white/60 text-sm">Create and manage spiritual blog content</p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-xl">
            <FileText className="w-8 h-8 text-chakra-heart mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Articles</h3>
            <p className="text-white/60 text-sm">Educational articles and guides</p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-xl">
            <Image className="w-8 h-8 text-chakra-solar mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Media Library</h3>
            <p className="text-white/60 text-sm">Manage images and visual content</p>
          </div>
          
          <div className="p-6 bg-white/5 rounded-xl">
            <Video className="w-8 h-8 text-chakra-crown mx-auto mb-3" />
            <h3 className="font-semibold text-white mb-2">Video Content</h3>
            <p className="text-white/60 text-sm">Meditation videos and tutorials</p>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}